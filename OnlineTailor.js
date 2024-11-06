function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.backgroundColor = '#28a745'; // Green background for success
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.marginBottom = '10px';
    toast.style.transition = 'opacity 0.5s';
    toast.style.opacity = '1';
    toast.style.position = 'relative';

    // Fade out effect
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 500); // Remove after fade out
    }, 3000); // Show for 3 seconds

    document.getElementById('toast').appendChild(toast);
}

// Flag to indicate if the form has been submitted successfully
let hasSubmitted = false;

document.getElementById('signupButton').addEventListener('click', validateForm);

function validateForm() {
    clearErrors(); // Clear previous error messages

    // Get form elements
    const username = document.getElementById('name').value.trim(); 
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signupconfirm-password').value.trim();
 
    let valid = true;

    // Validate Username
    if (username === "") {
        showError('nameid', '** please fill the User-Name');
        valid = false;
    } else if (!/^[A-Za-z]{3,20}$/.test(username)) {
        showError('nameid', 'Name must be 3-20 characters and contain only letters');
        valid = false;
    }
    
    // Validate Email
    if (email === "") {
        showError('emailid', '** please fill the Email ');
        valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError('emailid', '** please fill the Email id in proper format ');
        valid = false;
    }

    // Validate Phone
    if (phone === "") {
        showError('phoneid', '** please fill the Phone-no.');
        valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        showError('phoneid', '** Mobile-no should be 10 digits and contain only numbers');
        valid = false;
    }

    // Validate Password
    if (password === "") {
        showError('signup-password-id', '** please fill the Password');
        valid = false;
    } else if (password.length < 6) {
        showError('signup-password-id', 'Password must be at least 6 characters');
        valid = false;
    }

    // Validate Confirm Password
    if (confirmPassword === "") {
        showError('signupconfirm-password-id', '** please fill the Confirm-password');
        valid = false;
    } else if (password !== confirmPassword) {
        showError('signupconfirm-password-id', '** Passwords are not matching');
        valid = false;
    }

    // If form is valid, show success message with toast notification
    if (valid) {
        showToast("Form submitted successfully!"); // Show toast on success
        hasSubmitted = true; // Set the flag to indicate successful submission
        // You can submit the form or make an AJAX call here
    } else {
        hasSubmitted = false; // Reset the flag if there are validation errors
    }

    return valid; // Return the validation status
}

// Show error message function
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.style.color = 'red';
    errorElement.style.fontWeight = 'normal'; // Change to normal (not bold)
    errorElement.style.display = 'block'; // Ensures error appears on a new line
}

// Clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message'); // Select all elements with the class 'error-message'
    errorMessages.forEach(error => {
        error.innerText = ''; // Clear the text
        error.style.display = 'none'; // Hide errors when form is reset
    });
}

// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

// import { storeUserInfo } from './firestoreUtils.js'; 
// Firebase configuration (replace these with your Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyA-z28-qab2nmNd5b7XTK1oYwEP3wAYT84",
    authDomain: "onlinetailor-a2a85.firebaseapp.com",
    databaseURL: "https://onlinetailor-a2a85-default-rtdb.firebaseio.com",
    projectId: "onlinetailor-a2a85",
    storageBucket: "onlinetailor-a2a85.appspot.com",
    messagingSenderId: "181622097786",
    appId: "1:181622097786:web:0d062f75d30b1a0daa78c3"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-Up function
document.getElementById('Signup').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Validate form inputs
    if (!validateForm()) {
        return; // Stop if validation fails
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('signup-password').value;

    try {
         // Create user with Firebase Authentication
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
 
         // Store additional user data in Firestore
        //  await storeUserInfo(user.uid, name, email, phone);
        signupUser(email, password);

        showToast("Successfully Signed Up!");

        const closeButton = document.querySelector('#signupModal .btn-close');

        // Check if the close button exists (it should)
        if (closeButton) {
            // Simulate a click on the close button to close the modal
            closeButton.click();
        }
        // Reset the form
        document.getElementById('Signup').reset();
        clearErrors(); // Clear any displayed errors after reset
    } catch (error) {
        showToast(`Error: ${error.message}`); // Use toast for error notifications
    }


});

// Login function
async function login(event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('login-password').value;

    try {
        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showToast("Successfully Logged In!");

        // Close modal if needed and reset form
        const closeButton = document.querySelector('#loginModal .btn-close');
        if (closeButton) closeButton.click();
        document.getElementById('username').value = '';
        document.getElementById('login-password').value = '';

    } catch (error) {
        showToast(`Error: ${error.message}`); // Use toast for error notifications
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#loginModal form').addEventListener('submit', login);
});

