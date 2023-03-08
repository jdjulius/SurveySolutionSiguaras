import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { notificationType } from 'src/app/components/notification/notification.component';
import { INotification } from 'src/app/interfaces/notification';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  emailRegex =/^[a-zA-Z][a-zA-Z0-9|!|*|_|+|\-|{|}|~|.]+@[a-zA-Z0-9]+(?:\.[a-zA-Z]+)+$/;
  @ViewChild('inputOne') inputOne?: ElementRef;
  @ViewChild('inputTwo') inputTwo?: ElementRef;
  notificationType: string = 'info';
  message:string = '';
  showNotification:boolean = false;


  constructor(
    private fb: FormBuilder,
    private render: Renderer2,
    private auth: UserService,
    private route: Router,
    private notification:NotificationsService
  ) {}

  ngOnInit(): void {
    this.notification.notification$.subscribe((res:any)=>{
      this.message = res.message
      this.showNotification = true;
      console.log(this.notificationType, 'ingrese')
      setTimeout(() => {
        this.showNotification = false;
      }, res.time);
    });
  }
  loginForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
  });


  addFocusClass(typeInput: number) {
    if (typeInput === 1) {
      this.render.addClass(this.inputOne?.nativeElement, 'focus');
      return;
    }
    this.render.addClass(this.inputTwo?.nativeElement, 'focus');
  }

  async validateFormData() {
    if (this.loginForm.valid) {
      await this.singIn();
      return;
    }
  }

  async singIn() {
    await this.auth
        .login(this.loginForm.value)
        .then(() => {
          this.route.navigate(['/main']);
        })
        .catch((error) => {
          this.notificationType = 'error';
          this.notification.showNotification('Credenciales Invalidas', 1000);
        });
  }
}
