// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
        
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH7EtSuw8mudWNaKtW8hhlUP1Suh80xg4",
  authDomain: "authentication-page-9baba.firebaseapp.com",
  databaseURL: "https://authentication-page-9baba-default-rtdb.firebaseio.com",
  projectId: "authentication-page-9baba",
  storageBucket: "authentication-page-9baba.appspot.com",
  messagingSenderId: "636867264162",
  appId: "1:636867264162:web:1d30c681a24a127d62a1fb",
  measurementId: "G-VZW7B7Z92G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);

const db = getFirestore(app);

const auth = getAuth();

console.log(auth.currentUser);

console.log(db);

SignupButton.addEventListener('click',(e) => {

    var username = document.getElementById('Username').value;
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;



    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(userCredential);
        set(ref(database,'users/' + user.uid),{
            username: username,
            email: email,
            password: password
        });
        alert('user creeated');

        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert('errorMessage');
        // ..
    });

});

LoginButton.addEventListener('click',(e) => {

    // const auth = getAuth();
    var email = document.getElementById('Email-l').value;
    var password = document.getElementById('Password-l').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        const dt = new Date();
        update(ref(database,'users/' + user.uid),{
            last_login: dt,
        }).then(() => {window.location = 'index.html'});
        alert('User logged in!');
        
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert('errorMessage');
    });

});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // window.location = 'home-page.html'
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        alert(user.email);
        alert(user.displayName);

        // console.log(user);
        alert('logged In');
        localStorage.setItem('user_uid',JSON.stringify(user.uid));
        localStorage.setItem('user_name',JSON.stringify(user.displayName));
        localStorage.setItem('user_email',JSON.stringify(user.email));
        // window.location="home-page.html";


        
        // ...
    } else {
        // User is signed out
        alert('Login/SignUp to Continue');
        // ...
    }
    });


const provider = new GoogleAuthProvider(app);

const boxes = document.querySelectorAll('.social');

boxes.forEach(social =>{
social.addEventListener('click',(e) => {

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        alert(user.displayName);
        window.location = 'index.html'
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        alert(errorMessage);
    });
});
});





// status_c.addEventListener('click', (e) => {

//     const user = auth.currentUser;
//     onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         alert(user);
//         window.location = 'GamePage.html'
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         console.log(user);
//         // ...
//     } else {
//         // User is signed out
//         alert('Login/SignUp to Continue');
//         // ...
//     }
//     });
// });

Logout.addEventListener('click', (e) =>{

    signOut(auth).then(() => {
    // Sign-out successful.
    alert('User logged out');
    console.log('User logged out');

    localStorage.removeItem('user_uid');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');


    })
    .catch((error) => {
        const errorCode = error.code;
            const errorMessage = error.message;

            alert('Can\'t Log Out');
            
        });
    });


    

