import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Utility Functions
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.innerText = message;
    errorElement.style.color = "red";
    errorElement.style.fontWeight = "bold";
  }
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.innerText = "";
  });
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.zIndex = "1050";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.color = "#fff";
  toast.style.backgroundColor = type === "success" ? "green" : "red";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Validation Function
function validateForm() {
  clearErrors(); // Clear previous error messages

  const username = document.getElementById('name').value.trim(); 
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const confirmPassword = document.getElementById('signupconfirm-password').value.trim();

  let valid = true;

  // Validate Username
  if (username === "") {
    showError('nameid', '** Please fill the User-Name');
    valid = false;
  } else if (!/^[A-Za-z]{3,20}$/.test(username)) {
    showError('nameid', 'Name must be 3-20 characters and contain only letters');
    valid = false;
  }

  // Validate Email
  if (email === "") {
    showError('emailid', '** Please fill the Email');
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    showError('emailid', '** Please enter a valid Email ID');
    valid = false;
  }

  // Validate Phone
  if (phone === "") {
    showError('phoneid', '** Please fill the Phone number');
    valid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    showError('phoneid', '** Mobile number must be 10 digits');
    valid = false;
  }

  // Validate Password
  if (password === "") {
    showError('signup-password-id', '** Please fill the Password');
    valid = false;
  } else if (password.length < 6) {
    showError('signup-password-id', 'Password must be at least 6 characters');
    valid = false;
  }

  // Validate Confirm Password
  if (confirmPassword === "") {
    showError('signupconfirm-password-id', '** Please fill the Confirm Password');
    valid = false;
  } else if (password !== confirmPassword) {
    showError('signupconfirm-password-id', '** Passwords do not match');
    valid = false;
  }

  return valid;
}

// Sign-Up Functionality
document.getElementById("signupButton").addEventListener("click", async (event) => {
  event.preventDefault();
  if (validateForm()) {
    const username = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), { username, email, phone });

      showToast("Sign-Up Successful!", "success");

      document.getElementById("Signup").reset();
      const closeButton = document.querySelector("#signupModal .btn-close");
      if (closeButton) closeButton.click();
    } catch (error) {
      showToast(error.message, "error");
    }
  } else {
    showToast("Form contains errors. Please fix them.", "error");
  }
});

// Login Functionality
document.getElementById("loginButton").addEventListener("click", async (event) => {
  event.preventDefault();
  clearErrors();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (email === "") {
    showError("login-email-id", "** Please enter your Email");
    return;
  }
  if (password === "") {
    showError("login-password-id", "** Please enter your Password");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    showToast("Login Successful!", "success");

    document.getElementById("Login").reset();
    const closeButton = document.querySelector("#loginModal .btn-close");
    if (closeButton) closeButton.click();
  } catch (error) {
    showToast(error.message, "error");
  }
});


