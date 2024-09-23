// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3n9jo0aaIrdgJF4CWs9Io9xDTQAXjqJg",
    authDomain: "login-c02f9.firebaseapp.com",
    projectId: "login-c02f9",
    storageBucket: "login-c02f9.appspot.com",
    messagingSenderId: "22786978278",
    appId: "1:22786978278:web:ba0d2207e6f51e80022627"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Login function
  function login(event) {
    event.preventDefault(); // Prevent page reload on form submission
  
    // Get form values
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Firebase Authentication: Sign in the user
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successful login
        const user = userCredential.user;
        alert("Login successful! Welcome " + user.email);
      })
      .catch((error) => {
        // Handle errors here
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
      });
  }
  