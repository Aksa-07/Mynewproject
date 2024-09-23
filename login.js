const firebaseConfig = {
    apiKey: "AIzaSyC3n9jo0aaIrdgJF4CWs9Io9xDTQAXjqJg",
    authDomain: "login-c02f9.firebaseapp.com",
    projectId: "login-c02f9",
    storageBucket: "login-c02f9.appspot.com",
    messagingSenderId: "22786978278",
    appId: "1:22786978278:web:ba0d2207e6f51e80022627"
  };

  const app = initializeApp(firebaseConfig);
  const auth=firebase.auth()
  const database=firebase.database()

  function submitForm() {


    // Get form values
     name = document.getElementVal("name").value;
     emailid = document.getElementVal("email").value;
     telephone = document.getElementVal("phone").value;
     address = document.getElementVal("address").value;
     password = document.getElementVal("password").value;
     confirmpassword = document.getElementVal("confirm-password").value;

     if(validate_emailid(emailid)==false || validate_password(password)==false){
        alert('Email or Password is not Valid!')
        return
         
     }
     if(validate_field(name)==false || validate_field(telephone)==false || validate_field(address)==false){
        alert('')
        return
     }

     auth.createUserWithEamilAndPassword(emailid,password)
     .then(function(){

        var user=auth.currentUser
        var database_ref=database.ref()

        var user_data={
            emailid:emailid,
            name:name,
            telephone:phone,
            address:address,
            last_login:Date.now()

        }

        database_ref.child('users/' + user.uid).set(user_data)

        alert('User Created!')

     })
     .catch(function(error){
        var error_code=error.code
        var error_message=error.messagingSenderId
        alert("error_message")

     })



  }

  function validate_emailid(emailid){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(emailid)==true){
        return true

    }
    else{
        return false
    }

  }

  function validate_password(password){
    if(password<6){
        return false
    }
    else{
        return true
    }
  }

  function validate_field(field){
    if(field==null){
        return false
    }
    if(field.length<=0){
        return false

    }
    else{
        return true;
    }
  }