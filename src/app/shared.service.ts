import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedApplication: { id: number, name: string } | null = null;

  setSelectedApplication(application: { id: number, name: string }): void {
    console.log('nameee', application.name)
    this.selectedApplication = application;
  }

  getSelectedApplication(): { id: number, name: string } | null {
    return this.selectedApplication;
  }
}