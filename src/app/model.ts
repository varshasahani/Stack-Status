export interface IUser {
    id: number,
    name: string,
    email: string
}

export interface Application {
    id: string;
    name: string;
    logoUrl:string
    description: string;
    services: Service[];
  }

  export interface Incident {
    id: string;
    name: string;
    resolved: boolean;
    startDate: Date;
    endDate: Date;
  }

  export interface Service {
    id: string;
    name: string;
    status: string;
    recentIncident: string;
    active: boolean;
    timeline: string;
    incidents: Incident[];
  }