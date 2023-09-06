import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'keycloak.config';
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
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public get token(): string {
    return this.oauthService.getAccessToken();
  }
  public get user(): string | null {
    if (!this.isAuthenticated()) {
      return 'Login to proceed...';
    }
    let claims = this.oauthService.getIdentityClaims();
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
        this.logout();
      });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
  }

  public logout(): void {
    this.oauthService.logOut();
  }
}
