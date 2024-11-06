// Function to handle user signup
function signupUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully, now we get the user
      const user = userCredential.user;

      // Add user data to Firestore after signup
      setDoc(doc(db, "users", user.uid), {
        name: user.displayName || "No Name Provided",  // If displayName is null or not set
        email: user.email,
        createdAt: Timestamp.now(),  // Add the current timestamp
      })
      .then(() => {
        console.log("User data added to Firestore successfully!");
      })
      .catch((error) => {
        console.error("Error adding user to Firestore:", error);
      });
    })
    .catch((error) => {
      // Handle signup errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during signup:", errorMessage);
    });
}
