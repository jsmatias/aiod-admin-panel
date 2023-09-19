import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/configs/keycloak.config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authenticationEventObservable: Subject<boolean> =
    new Subject<boolean>();

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
  }

  public get user(): string | null {
    if (!this.isAuthenticated()) {
      return 'Login to proceed...';
    }
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  public get token(): Promise<string> {
    return new Promise<string>((resolve) => {
      this.oauthService.events.subscribe((event) => {
        if (
          event.type === 'token_received' ||
          this.oauthService.hasValidAccessToken()
        ) {
          console.log('token Received');
          resolve(this.oauthService.getAccessToken());
        }
      });
    });
  }

  public isAuthenticated(): boolean {
    return (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    );
  }

  public login(): void {
    if (!this.isAuthenticated()) {
      this.oauthService
        .loadDiscoveryDocumentAndLogin()
        .then((result: boolean) => {
          this.authenticationEventObservable.next(result);
        })
        .catch((error) => {
          console.error(error);
          this.logout();
        });
    }
  }

  public logout(): void {
    if (this.oauthService.hasValidAccessToken()) {
      console.log(this.oauthService.getAccessToken());
      this.oauthService.logOut();
    }
  }
}
