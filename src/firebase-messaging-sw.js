importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBvV2bCrV3GKzXEj2wEEDPWKh3O2oJ6AD4",
  authDomain: "salgar-demo.firebaseapp.com",
  projectId: "salgar-demo",
  storageBucket: "salgar-demo.appspot.com",
  messagingSenderId: "710668310112",
  appId: "1:710668310112:web:0af6eeafd026abe88d9505",
  measurementId: "G-FBR7T9GR04",
});

const messaging = firebase.messaging();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(function (registration) {})
    .catch(function (err) {
      console.log("error", err);
    });
}

messaging.onBackgroundMessage((payload) => {
  self.clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(function (clients) {
      clients.forEach(function (client) {
        client.postMessage(payload);
      });
    });
});

self.addEventListener("push", (event) => {
  const promiseChain = isClientFocused(event).then((clientIsFocused) => {
    var data = event.data.json().data;
    var title = data.title || "No tiltle";
    // var message = JSON.parse(data.body)
    self.registration.showNotification(title, {
      body: data.body,
      icon: "./assets/salgarlogo.png",
      tag: "Salgar",
    });
    return;
  });
  event.waitUntil(promiseChain);
});

function isClientFocused(event) {
  var data = event.data.json().data;
  // var message1 = undefined;
  // message1 = JSON.parse(data.data1);

  return clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((windowClients) => {
      let clientIsFocused = false;
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.focused) {
          clientIsFocused = false;
          break;
        }
      }
      return false;
    });
}

// self.addEventListener("push", (event) => {
//     const data = event.data.json().data;
//     const promiseChain = isClientFocused(event).then((clientIsFocused) => {
//         const title = data.title || "No title";
//         const notificationOptions = {
//             body: data.body,
//             icon: './assets/salgarlogo.png',
//             tag: 'Salgar',
//         };
//         return self.registration.showNotification(title, notificationOptions);
//         // self.registration.showNotification('Test Notification', {
//         //     body: 'This is a test notification',
//         //   });
//     });
//     event.waitUntil(promiseChain);
// });

// function isClientFocused(event) {
//     var data = event.data.json().data;
//     var message1 = undefined;

//     var d = JSON.stringify(data.data1);
//     message1 = JSON.parse(d);
//     return clients.matchAll({ type: "window", includeUncontrolled: true, }).then((windowClients) => {
//         let clientIsFocused = false;

//         for (let i = 0; i < windowClients.length; i++) {
//             const windowClient = windowClients[i];
//             if (windowClient.focused) {
//                 clientIsFocused = true; // Update to true when a focused client is found
//                 break;
//             }
//         }
//         return clientIsFocused; // Return the correct value
//     });
// }
