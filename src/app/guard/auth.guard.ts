import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private afAuth: AngularFireAuth) { }

    getUser() {

        this.afAuth.authState.subscribe(user => {
            if (user) {

            } else {

            }
        });
    }
}
