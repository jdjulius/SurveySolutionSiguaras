import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private auth:UserService, private route:Router){}

  logout(){
    this.auth.lougout().then(()=>this.route.navigate(['/login'])).catch();
  }
}
