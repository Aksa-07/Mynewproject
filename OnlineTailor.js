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


// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';


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

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signupconfirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            phone: phone,
            address: address,
            email: email
        });

        showToast("Successfully Signed Up!");
        const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
        if (signupModal) {
            signupModal.hide();
        }

        // Reset the form
        document.getElementById('Signup').reset();
    } catch (error) {
        alert(`Error: ${error.message}`);
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
        alert(`Error: ${error.message}`);
    }
}

// Attach login function to the login form submit event
document.querySelector('#loginModal form').addEventListener('submit', login);
