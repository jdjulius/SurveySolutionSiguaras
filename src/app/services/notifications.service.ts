import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INotification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notificationSource = new Subject();
  notification$ = this.notificationSource.asObservable();

  constructor() { }

  showNotification(message:string, time: number = 1000){
    this.notificationSource.next({message, time});
  }


}
