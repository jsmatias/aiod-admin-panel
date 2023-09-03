import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost/aiod-auth/realms/aiod',
  clientId: 'admin-panel',
  redirectUri: window.location.origin + '/home',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
};
