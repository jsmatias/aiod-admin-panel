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
    this.configure();
  }

  private configure(): void {
    this.oauthService.configure(authConfig);
  }

  public get token(): string {
    return this.oauthService.getAccessToken();
  }
  public get user(): string | null {
    if (!this.isAuthenticated()) {
      return 'Login to proceed...';
    }
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }
  public isAuthenticated(): boolean {
    return (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    );
  }

  public login() {
    this.oauthService
      .loadDiscoveryDocumentAndLogin()
      .then((result: boolean) => {
        this.authenticationEventObservable.next(result);
      })
      .catch((error) => {
        console.error(error);
        this.logout();
      });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }

  public logout(): void {
    this.oauthService.logOut();
  }
}
