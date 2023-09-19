import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // issuer: 'http://localhost/aiod-auth/realms/aiod',
  // clientId: 'admin-panel',
  issuer: 'https://test.openml.org/aiod-auth/realms/dev',
  // issuer: 'https://aiod-dev.i3a.es/aiod-auth/realms/dev',
  clientId: 'success-stories-public',
  redirectUri: window.location.origin + '/home',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
};
