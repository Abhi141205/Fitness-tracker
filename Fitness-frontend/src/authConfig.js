export const authConfig = {
  clientId: 'oauth2-pkce-client',

  authorizationEndpoint:
    'https://keycloak-7hni.onrender.com/realms/fitness-app/protocol/openid-connect/auth',

  tokenEndpoint:
    'https://keycloak-7hni.onrender.com/realms/fitness-app/protocol/openid-connect/token',

  redirectUri: window.location.origin + '/',

  scope: 'openid profile email offline_access',

  onRefreshTokenExpire: (event) => event.logIn(),
}