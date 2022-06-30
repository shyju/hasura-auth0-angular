export const environment = {
  production: true,
  hasura: {
    base_url: "https://hasura-auth0-master.hasura.app/v1/graphql"
  },
  auth0: {
    redirectUri: 'https://hasura-angular-auth0.herokuapp.com/home;http://localhost:4200/home, ',
    logoutRedirectUri: 'https://hasura-angular-auth0.herokuapp.com/login;http://localhost:4200/login, '
  }
};
