export const environment = {
  production: true,
  hasura: {
    base_url: "https://hasura-auth0-master.hasura.app/v1/graphql"
  },
  auth0: {
    redirectUri: 'http://localhost:4200/home, https://hasura-angular-auth0.herokuapp.com/home',
    logoutRedirectUri: 'http://localhost:4200/login, https://hasura-angular-auth0.herokuapp.com/login'
  }
};
