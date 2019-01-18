import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  public login(email: string, senha: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, senha).then(() => {
      this.router.navigate(['/view']);
    });
  }

  public logout() {
    this.router.navigate(['']);
    return this.afAuth.auth.signOut();
  }
}
