import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInUser } from 'src/app/interfaces/userInfo.interface';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  isUserLoggedIn: boolean = false;
  loggedInUser: any;

  constructor(private ngZone: NgZone, private router: Router) {
    this.isUserLoggedIn = this.userAlreadyLoggedIn();

    if (this.isUserLoggedIn) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') as string);

      const isLocalStorageForNewUserExist = localStorage.getItem('userInfo') as string;
      
      if (isLocalStorageForNewUserExist && JSON.parse(isLocalStorageForNewUserExist)?.id) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/addDetails']);
      }
    }
  }

  userAlreadyLoggedIn() {
    return !!localStorage.getItem('loggedInUser');
  }

  ngAfterViewInit() {
    this.waitForGoogleScript();
  }

  waitForGoogleScript() {
    const checkGoogle = setInterval(() => {
      if (typeof google !== 'undefined') {
        clearInterval(checkGoogle);
        this.loadGoogleSignIn();
      }
    }, 500);
  }

  loadGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: '60993485374-lqif3b58m0sh6sf3e0leek2m62o6vvh3.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      document.querySelector('.g_id_signin'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleCredentialResponse(response: any) {
    this.ngZone.run(() => {
      const token = response.credential;
      const user = this.decodeJwt(token);

      const loggedInUser: LoggedInUser = {
        name: user.name,
        emailId: user.email,
        profilePicture: user.picture
      }

      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

      const isLocalStorageForNewUserExist = localStorage.getItem('userInfo') as string;
      
      if (isLocalStorageForNewUserExist && JSON.parse(isLocalStorageForNewUserExist)?.id) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/addDetails']);
      }
    });
  }

  decodeJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }
}
