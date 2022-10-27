// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const requestOptions:RequestInit = {
  method: 'GET',
  redirect: 'follow'
}

let config;

fetch("/config.json", requestOptions)
  .then(response => config= response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

export const environment = {
  production: false,
  apiEndpoint:config.apiEndpoint
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
