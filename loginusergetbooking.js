// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-z28-qab2nmNd5b7XTK1oYwEP3wAYT84",
  authDomain: "onlinetailor-a2a85.firebaseapp.com",
  projectId: "onlinetailor-a2a85",
  storageBucket: "onlinetailor-a2a85.appspot.com",
  messagingSenderId: "181622097786",
  appId: "1:181622097786:web:0d062f75d30b1a0daa78c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Add click event listener to the booking button
document.getElementById('bookingButton').addEventListener('click', (event) => {
  console.log("Button clicked!"); // Debugging to ensure button is working

  // Check if user is logged in
  const user = auth.currentUser;

  if (user) {
    console.log("User is logged in:", user.email); // Debugging to show logged-in user's email
    // Redirect to appointment page
    window.location.href = 'appointment.html';
  } else {
    console.log("User is not logged in!"); // Debugging if user is not logged in
    event.preventDefault(); // Prevent default button action
    alert('Please login to book an appointment');
  }
});

// Optional: Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("No user logged in.");
  }
});


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);

        // Add custom logic for session timeout
        const loginTime = new Date().getTime(); // Get login time in milliseconds
        const sessionDuration = 2 * 60 * 60 * 1000; // Set session duration (e.g., 2 hours)

        setTimeout(() => {
            // Automatically sign out the user after session duration
            signOut(auth).then(() => {
                console.log("Session expired. User logged out.");
                alert("Your session has expired. Please log in again.");
            }).catch((error) => {
                console.error("Error signing out:", error);
            });
        }, sessionDuration);
    } else {
        console.log("No user is logged in.");
    }
});

