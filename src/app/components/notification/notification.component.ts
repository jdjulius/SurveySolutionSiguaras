import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

export enum notificationType{
  success = 'success',
  error = 'error',
  info = 'info'
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})


export class NotificationComponent implements AfterViewInit{

  constructor(private render:Renderer2){}

  @Input() message:string = 'notification';
  @Input() type:string = notificationType.success;
  @Input() visible:boolean = false;
  @ViewChild('notification') notificationBox? : ElementRef;

  ngAfterViewInit(): void {
    this.addTypeClass();
  }
  addTypeClass() {
    if(this.type === notificationType.success){
      this.render.addClass(this.notificationBox?.nativeElement, 'notification--success')
      return
    }
    if(this.type === notificationType.error){
      this.render.addClass(this.notificationBox?.nativeElement, 'notification--error')
      return
    }
  }

  ngOnChanges() {
    if(this.type){
      this.addTypeClass();
    }
  }

}
