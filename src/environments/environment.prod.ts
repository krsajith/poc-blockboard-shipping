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
  production: true,
  apiEndpoint:config.apiEndpoint
};