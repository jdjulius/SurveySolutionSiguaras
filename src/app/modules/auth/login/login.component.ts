import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailRegex =
    /^[a-zA-Z][a-zA-Z0-9|!|*|_|+|\-|{|}|~|.]+@[a-zA-Z0-9]+(?:\.[a-zA-Z]+)+$/;
  @ViewChild('inputOne') inputOne?: ElementRef;
  @ViewChild('inputTwo') inputTwo?: ElementRef;
  constructor(
    private fb: FormBuilder,
    private render: Renderer2,
    private auth: UserService,
    private route: Router
  ) {}
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
    console.log(this.loginForm.controls['email'].valid);
    console.log(this.loginForm.controls['password'].valid);
    console.log(this.loginForm.valid);
    this.auth.lougout()
    if (this.loginForm.valid) {
      await this.auth
        .login(this.loginForm.value)
        .then(() => {
          console.log('he resuelto correctamente')
          this.route.navigate(['/main'])
        }
        )
        .catch((error) => {
          console.log(error);
          console.log(this.loginForm.value);
        });
        return
    }
    console.log('no ingrese al login');
  }
}
