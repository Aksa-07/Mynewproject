// // Firebase configuration

// import {initializeApp} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"
// import {getDatabase,ref,set,get,child} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js"
// const firebaseConfig = {
//   apiKey: "AIzaSyC3n9jo0aaIrdgJF4CWs9Io9xDTQAXjqJg",
//   authDomain: "login-c02f9.firebaseapp.com",
//   projectId: "login-c02f9",
//   storageBucket: "login-c02f9.appspot.com",
//   messagingSenderId: "22786978278",
//   appId: "1:22786978278:web:ba0d2207e6f51e80022627"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// document.getElementById("Login").addEventListener('click',function(e){
//   e.preventDefault();
//   set(ref(db,'user/'  + document.getElementById("username").value),
// {
//   username:document.getElementById("username").value,
//   password:document.getElementById("password").value
  
// });
// alert("Login Sucessfully !")
// })

// Import Firebase modules
// Firebase SDK imports (no need if directly importing in HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Firebase configuration (make sure you replace these with your real values)
const firebaseConfig = {
  apiKey: "AIzaSyC3n9jo0aaIrdgJF4CWs9Io9xDTQAXjqJg",
  authDomain: "login-c02f9.firebaseapp.com",
  databaseURL: "https://login-c02f9-default-rtdb.firebaseio.com/",  // Make sure to include the database URL
  projectId: "login-c02f9",
  storageBucket: "login-c02f9.appspot.com",
  messagingSenderId: "22786978278",
  appId: "1:22786978278:web:ba0d2207e6f51e80022627"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Login function
function login(event) {
  event.preventDefault(); // Prevent the form from reloading the page

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validate input
  if (!username || !password) {
    alert("Please fill in all the fields.");
    return;
  }

  // Store the data in Firebase Realtime Database
  set(ref(db, 'users/' + username.replace(/\./g, '_')), { // Replace dots in email to prevent key issues
    username: username,
    password: password // WARNING: Storing plaintext passwords is insecure!
  })
  .then(() => {
    alert("Login information stored successfully.");
  })
  .catch((error) => {
    alert("Error storing data: " + error.message);
  });
}
