import firebase from "firebase/app"
import "firebase/auth"

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAgfzFa5sf_e6YIZBpcc6tyyNodkhe1QM0",
        authDomain: "saigon-ad5c6.firebaseapp.com",
        databaseURL: "https://saigon-ad5c6.firebaseio.com",
        projectId: "saigon-ad5c6",
        storageBucket: "saigon-ad5c6.appspot.com",
        messagingSenderId: "88073822988",
        appId: "1:88073822988:web:14e5aef04f04794c011f29",
        measurementId: "G-K2Y6ZG1Y53",
    })
}
