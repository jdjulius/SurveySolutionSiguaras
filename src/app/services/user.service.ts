import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import { signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth:Auth) { }

  register(email: string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}:any){
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  lougout(){
    return signOut(this.auth);
  }


}
