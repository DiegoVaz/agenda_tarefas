import { Validators, FormControl } from '@angular/forms';
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
  usuario: string;
  senha: string;
  hide = true;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  public login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.usuario, this.senha)
      .then(user => {
        this.router.navigate(['/view']);
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  criarUsuario() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.usuario, this.senha)
      .then(user => {
        this.router.navigate(['/']);
      })
      .catch(erro => {
        console.log(erro);
      });
  }
}
