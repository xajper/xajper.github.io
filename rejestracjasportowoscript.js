var firebaseConfig = {
  apiKey: "AIzaSyBWOYsHghiKRepKMFRKMX6U4hf2A8A2QuM",
  authDomain: "sportowo-20862.firebaseapp.com",
  databaseURL: "https://sportowo-20862-default-rtdb.firebaseio.com",
  projectId: "sportowo-20862",
  storageBucket: "sportowo-20862.appspot.com",
  messagingSenderId: "823759230798",
  appId: "1:823759230798:web:c1c33fa4c443d9f7c8701f"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

function register () {

email = document.getElementById('email_field').value
password = document.getElementById('password_field').value
full_name = document.getElementById('name_field').value


if (validate_email(email) == false || validate_password(password) == false) {
  alert('Uzupełnij hasło lub email!')
  return
}
if (validate_field(full_name) == false) {
  alert('Uzupełnij nazwę')
  return
}

auth.createUserWithEmailAndPassword(email, password)
.then(function() {

  var user = auth.currentUser

  var database_ref = database.ref()

  var user_data = {
    email : email,
    full_name : full_name,
    last_login : Date.now()
  }

  database_ref.child('users/' + user.uid).set(user_data)

  // DOne
  alert('Zarejestrowano poprawnie!')
})
.catch(function(error) {

  var error_code = error.code
  var error_message = error.message

  alert(error_message)
})
}

function login () {

email = document.getElementById('email_field').value
password = document.getElementById('password_field').value

if (validate_email(email) == false || validate_password(password) == false) {
  alert('Niepoprawne hasło lub email!')
  return
}

auth.signInWithEmailAndPassword(email, password)
.then(function() {
  var user = auth.currentUser

  var database_ref = database.ref()

  var user_data = {
    last_login : Date.now()
  }

  database_ref.child('users/' + user.uid).update(user_data)

  alert('Zalogowano!')

})
.catch(function(error) {
  var error_code = error.code
  var error_message = error.message

  alert(error_message)
})
}

function validate_email(email) {
expression = /^[^@]+@\w+(\.\w+)+\w$/
if (expression.test(email) == true) {
  return true
} else {
  return false
}
}

function validate_password(password) {

if (password < 6) {
  return false
} else {
  return true
}
}

function validate_field(field) {
if (field == null) {
  return false
}

if (field.length <= 0) {
  return false
} else {
  return true
}
}

function togglePassword() {
  const passwordInput = document.getElementById('password_field');
  const toggleIcon = document.querySelector('.toggle-icon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  }
}
