// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hasura: {
    base_url: 'http://localhost:8080/v1/graphql'
  },
  auth0: {
    redirectUri: 'http://localhost:4200/home, https://hasura-angular-auth0.herokuapp.com/home',
    logoutRedirectUri: 'http://localhost:4200/login, https://hasura-angular-auth0.herokuapp.com/login'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
