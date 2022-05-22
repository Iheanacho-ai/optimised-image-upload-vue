import { Appwrite } from 'appwrite';
export const sdk = new Appwrite();
sdk
  .setEndpoint('http://localhost/v1') // Replace this with your endpoint
  .setProject('628a8ff793a00d489262'); // Replace this with your ProjectID

// Create an anonymous user session

sdk.account.createAnonymousSession().then(
(response) => {
    console.log(response);
},
(error) => {
    console.log(error);
}
);