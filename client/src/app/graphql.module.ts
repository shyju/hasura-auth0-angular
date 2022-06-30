import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, fromPromise, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './services/auth.service';

import {onError} from "@apollo/client/link/error";
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

const uri = 'http://localhost:8080/v1/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, authService: AuthService): ApolloClientOptions<any> {
  

  // const authHeader = new HttpHeaders()
  // // .set('x-hasura-admin-secret', 'myadminsecretkey')
  // .set('ContentType', 'application/json')
  // .set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)


  const middleware =  new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('id_token') || null}`)
    });
    return forward(operation);
  })

  const onErrorHandler = onError(({graphQLErrors, networkError , operation, forward}) => {
        if (graphQLErrors) {
          graphQLErrors.map(({message, locations, path}) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
          })
          
          return fromPromise(
            authService.renewSession().then(({token}) => {
              let authHeader = {
                // ...operation.getContext()?.headers,
                authorization: `Bearer ${token}`
              };
    
              operation.setContext({headers: authHeader});
              return forward(operation);
            }).catch((err) => {
              return err;
            })
          )
        }
    
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
        return forward(operation)
      })
  
  return {
    link: ApolloLink.from([
      onErrorHandler, middleware.concat(httpLink.create({uri}))
    ]),
    // link: httpLink.create({uri, headers: authHeader}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
      
    },
  ],
})
export class GraphQLModule {}
