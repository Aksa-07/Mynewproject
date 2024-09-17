// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdKfeSzGTfnWhHLqSDOEbLzrt6zCw9qGk",
    authDomain: "signupform-3ddf1.firebaseapp.com",
    databaseURL: "https://signupform-3ddf1-default-rtdb.firebaseio.com",
    projectId: "signupform-3ddf1",
    storageBucket: "signupform-3ddf1.appspot.com",
    messagingSenderId: "630383702671",
    appId: "1:630383702671:web:2b6c0190911e08dd4536fa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var SignupFormDB = firebase.database().ref("SignupForm");

// Add event listener for the form
document.getElementById("Signup").addEventListener("submit", submitForm);

// Form submission handler
function submitForm(e) {
    e.preventDefault();

    // Get form values
    var name = getElementVal("name");
    var emailid = getElementVal("email");
    var telephone = getElementVal("phone");
    var address = getElementVal("address");
    var password = getElementVal("password");
    var confirmpassword = getElementVal("confirm-password");

    // Save form data to Firebase
    saveMessages(name, emailid, telephone, address, password, confirmpassword);


    var alertBox = document.querySelector('.alert');
    alertBox.classList.add('show');

    // Hide the alert after 3 seconds
    setTimeout(function() {
        alertBox.classList.remove('show');
    }, 3000);
    document.getElementById("Signup").reset();

}

// Function to save the form data to Firebase
const saveMessages = (name, emailid, telephone, address, password, confirmpassword) => {
    var newSignupForm = SignupFormDB.push();

    newSignupForm.set({
        name: name,
        emailid: emailid,
        telephone: telephone,
        address: address,
        password: password,
        confirmpassword: confirmpassword
    });
};

// Function to get the value of an element by ID
const getElementVal = (id) => {
    return document.getElementById(id).value;
};
