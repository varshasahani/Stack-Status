// filepath: /c:/Users/E2017567/Development/stackStatus/stackStatus/src/backend/server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const WebSocket = require('ws');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist/stack-status')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/stack-status/index.html'));
});
const port = process.env.PORT || 3000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Function to create the applications table if it does not exist
async function createApplicationsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logoUrl VARCHAR(255),
      description TEXT
    );
  `;
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    client.release();
    console.log('Applications table created or already exists.');
  } catch (err) {
    console.error('Error creating applications table:', err);
  }
}
app.post('/api/create-table', async (req, res) => {
  const createTableQuery = `
    CREATE TABLE applications (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      logoUrl VARCHAR(255)
    );
  `;
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    res.send("Table created successfully");
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// Function to create the services table if it does not exist
async function createServicesTable() {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(255),
    application_id INTEGER REFERENCES applications(id)
  );
`;
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    client.release();
    console.log('Services table created or already exists.');
  } catch (err) {
    console.error('Error creating services table:', err);
  }
}

// Function to create the incidents table if it does not exist
async function createIncidentsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS incidents (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      resolved BOOLEAN,
      startDate DATE,
      endDate DATE,
      service_id INTEGER REFERENCES services(id)
    );
  `;
  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    client.release();
    console.log('Incidents table created or already exists.');
  } catch (err) {
    console.error('Error creating incidents table:', err);
  }
}

// Call the functions to create the tables
createApplicationsTable();
createServicesTable();
createIncidentsTable();


app.get('/api/applications', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM applications');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/api/add-application', async (req, res) => {
  const { name, description, logoUrl } = req.body;
  const insertQuery = `
    INSERT INTO applications (name, description, logoUrl)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(insertQuery, [name, description, logoUrl]);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/api/applications/add', async (req, res) => {
  const { name, description, logoUrl } = req.body;
  const insertQuery = `
    INSERT INTO applications (name, description, logoUrl)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(insertQuery, [name, description, logoUrl]);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.delete('/api/applications/:id', async (req, res) => {
  const { id } = req.params;
  const deleteQuery = `
    DELETE FROM applications
    WHERE id = $1
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(deleteQuery, [id]);
    if (result.rowCount === 0) {
      res.status(404).send("Application not found");
    } else {
      res.json(result.rows[0]);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/api/applications/:applicationId/services', async (req, res) => {
  const { applicationId } = req.params;
  const selectQuery = `
    SELECT id, name, status
    FROM services
    WHERE application_id = $1;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(selectQuery, [applicationId]);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/api/services/add', async (req, res) => {
  const { name, status, applicationId } = req.body;
  console.log(`Adding service with name: ${name}, status: ${status}, applicationId: ${applicationId}`);
  const insertQuery = `
    INSERT INTO services (name, status, application_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(insertQuery, [name, status, applicationId]);
    console.log(`Query result: ${JSON.stringify(result.rows)}`);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.put('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const updateQuery = `
    UPDATE services
    SET name = $1, status = $2
    WHERE id = $3
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(updateQuery, [name, status, id]);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.delete('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  const deleteQuery = `
    DELETE FROM services
    WHERE id = $1
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(deleteQuery, [id]);
    if (result.rowCount === 0) {
      res.status(404).send("Service not found");
    } else {
      res.json(result.rows[0]);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/api/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  const selectQuery = `
    SELECT id, name, status
    FROM services
    WHERE id = $1;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(selectQuery, [serviceId]);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/api/services/:serviceId/incidents', async (req, res) => {
  const { serviceId } = req.params;
  const selectQuery = `
    SELECT id, name, resolved, startDate, endDate
    FROM incidents
    WHERE service_id = $1;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(selectQuery, [serviceId]);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.post('/api/services/:serviceId/incidents/add', async (req, res) => {
  const { serviceId } = req.params;
  const { name, resolved, startDate, endDate } = req.body;
  const insertQuery = `
    INSERT INTO incidents (name, resolved, startDate, endDate, service_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(insertQuery, [name, resolved, startDate, endDate, serviceId]);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.put('/api/incidents/:id', async (req, res) => {
  const { id } = req.params;
  const { name, resolved, startDate, endDate } = req.body;
  const updateQuery = `
    UPDATE incidents
    SET name = $1, resolved = $2, startDate = $3, endDate = $4
    WHERE id = $5
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(updateQuery, [name, resolved, startDate, endDate, id]);
    res.json(result.rows[0]);
    broadcast({ type: 'incidentUpdate', incidentId: result.rows[0].id });
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.delete('/api/incidents/:id', async (req, res) => {
  const { id } = req.params;
  const deleteQuery = `
    DELETE FROM incidents
    WHERE id = $1
    RETURNING *;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(deleteQuery, [id]);
    if (result.rowCount === 0) {
      res.status(404).send("Incident not found");
    } else {
      res.json(result.rows[0]);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/api/services', async (req, res) => {
  const selectQuery = `
    SELECT id, name, status, application_id
    FROM services;
  `;
  try {
    const client = await pool.connect();
    const result = await client.query(selectQuery);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// Get an incident by ID
app.get('/api/incidents/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM incidents WHERE id = $1';
  try {
    const client = await pool.connect();
    const result = await client.query(query, [id]);
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error ' + err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});