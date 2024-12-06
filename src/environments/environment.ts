// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  firebase: {
    // apiKey: "AIzaSyA8wMT8iRhkQ0T4GqIuTOqGIsMlT0ouNyI",
    // authDomain: "maihyundai-demo.firebaseapp.com",
    // projectId: "maihyundai-demo",
    // storageBucket: "maihyundai-demo.appspot.com",
    // messagingSenderId: "533314466215",
    // appId: "1:533314466215:web:d2ce538d19722d34d0c682",

    //live firebase code
    apiKey: 'AIzaSyAUEw66KXS-FRfPdSk6WTwP8DPXEv-E-r4',
    authDomain: 'maihyundai-c1b37.firebaseapp.com',
    projectId: 'maihyundai-c1b37',
    storageBucket: 'maihyundai-c1b37.appspot.com',
    messagingSenderId: '713915671917',
    appId: '1:713915671917:web:e0b500d2e888df99dae664',
    measurementId: 'G-CXB9EYY67P',

    // testing Firebase code

    // apiKey: "AIzaSyA8wMT8iRhkQ0T4GqIuTOqGIsMlT0ouNyI",
    // authDomain: "maihyundai-demo.firebaseapp.com",
    // projectId: "maihyundai-demo",
    // storageBucket: "maihyundai-demo.appspot.com",
    // messagingSenderId: "533314466215",
    // appId: "1:533314466215:web:d2ce538d19722d34d0c682"
    // appVersion: require('../../package.json').version,
    appVersion1: require('../../package.json').version + '-dev',
    appVersion2: require('../../package.json').version,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
