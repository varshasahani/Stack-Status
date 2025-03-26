// filepath: src/app/services/application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications`);
  }

  addApplication(application: { name: string; description: string; logoUrl: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/applications/add`, application);
  }

  deleteApplication(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/applications/${id}`);
  }

  getServicesByApplicationId(applicationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications/${applicationId}/services`);
  }

  getServiceById(serviceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/services/${serviceId}`);
  }

  addService(service: { name: string; status: string; applicationId: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services/add`, service);
  }

  editService(service: { id: number; name: string; status: string; recentIncident: string; active: boolean; timeline: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/services/${service.id}`, service);
  }

  deleteService(serviceId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/services/${serviceId}`);
  }

  getIncidents(serviceId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services/${serviceId}/incidents`);
  }

  addIncident(incident: { name: string; resolved: boolean; startDate: Date; endDate: Date; serviceId: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services/${incident.serviceId}/incidents/add`, incident);
  }

  editIncident(incident: { id: number; name: string; resolved: boolean; startDate: Date; endDate: Date }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/incidents/${incident.id}`, incident);
  }

  deleteIncident(incidentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/incidents/${incidentId}`);
  }

  getIncidentById(incidentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/incidents/${incidentId}`);
  }
}