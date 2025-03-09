import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInUser } from 'src/app/interfaces/userInfo.interface';
import { TabActionService } from 'src/app/services/tab-action.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  private clientId = '60993485374-lqif3b58m0sh6sf3e0leek2m62o6vvh3.apps.googleusercontent.com';
  isUserLoggedIn: boolean = false;
  loggedInUser: any;

  constructor(private ngZone: NgZone, private router: Router, public tabActionService: TabActionService) {
    this.isUserLoggedIn = this.userAlreadyLoggedIn();
    const hasUserAlreadySeenThisPage = localStorage.getItem('newScreenShown');

    if (this.isUserLoggedIn || hasUserAlreadySeenThisPage === "true") {
      this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') as string);

      const isLocalStorageForNewUserExist = localStorage.getItem('userInfo') as string;
      
      if (isLocalStorageForNewUserExist && JSON.parse(isLocalStorageForNewUserExist)?.id) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/addDetails']);
      }
    }
  }
  
  signIn() {
    this.tabActionService.setUserInfo(this.tabActionService.userInfo);
    this.tabActionService.updateLocalStorage(this.tabActionService.userInfo);
    localStorage.setItem('newScreenShown', 'true');
    this.router.navigate(['/home']);
  }

  public signInWithGoogle() {
    const authWindow = window.open(
      'https://accounts.google.com/o/oauth2/auth?client_id=60993485374-lqif3b58m0sh6sf3e0leek2m62o6vvh3.apps.googleusercontent.com&redirect_uri=https://localhost/login&response_type=token&scope=profile email',
      '_blank',
      'width=500,height=600,top=100,left=100'
    );

    if (!authWindow) {
      alert('Popup blocked! Please allow pop-ups for this site.');
      return;
    }

    // Listen for the authentication token from the pop-up window
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://localhost/login') {
        console.warn('Received message from unknown origin:', event.origin);
        return;
      }

      console.log('Google OAuth Token:', event.data);
      this.handleCredentialResponse(event.data);
      authWindow.close();
    });
  }
  
  userAlreadyLoggedIn() {
    return !!localStorage.getItem('loggedInUser');
  }
  
  ngAfterViewInit() {
  }

  handleCredentialResponse(response: any) {
    console.log('GOOGLE SIGN IN : ', response);
    this.ngZone.run(() => {
      const token = response.credential;
      const user = this.decodeJwt(token);
      const loggedInUser: LoggedInUser = {
        name: user.name,
        emailId: user.email,
        profilePicture: user.picture
      }

      this.tabActionService.userInfo.profilePicture = user.picture;
      this.tabActionService.userInfo.name = user.name;
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      localStorage.setItem('newScreenShown', 'true');

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
