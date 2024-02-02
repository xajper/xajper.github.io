var firebaseConfig = {
  apiKey: "AIzaSyBWOYsHghiKRepKMFRKMX6U4hf2A8A2QuM",
  authDomain: "sportowo-20862.firebaseapp.com",
  databaseURL: "https://sportowo-20862-default-rtdb.firebaseio.com",
  projectId: "sportowo-20862",
  storageBucket: "sportowo-20862.appspot.com",
  messagingSenderId: "823759230798",
  appId: "1:823759230798:web:c1c33fa4c443d9f7c8701f"
};

var avatarSelectedFromDiv = false;

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

  alert('Zarejestrowano poprawnie!')
})
.catch(function(error) {

  var error_code = error.code
  var error_message = error.message

  alert(error_message)
})
}

function login() {
  const email = document.getElementById('email_field').value;
  const password = document.getElementById('password_field').value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Niepoprawne hasło lub email!');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      const user = auth.currentUser;
      const database_ref = database.ref('users/' + user.uid);

      var user_data = {
        last_login: Date.now()
      };

      database_ref.update(user_data);

      database_ref.once('value')
        .then(function (snapshot) {
          const avatarPath = snapshot.val().avatar;
          const avatarUrl = avatarPath ? `sportowoavatary/${avatarPath}` : 'sportowoavatary/avatar0.png';

          const logoContainer = document.getElementById('logo_container');
          if (logoContainer) {
            logoContainer.style.width = '80px';
            logoContainer.style.height = '80px';
            logoContainer.style.backgroundImage = `url('${avatarUrl}')`;
            logoContainer.style.backgroundSize = 'cover';
            logoContainer.style.backgroundPosition = 'center';
            logoContainer.style.backgroundRepeat = 'no-repeat';
            logoContainer.style.border = '1px solid #F7F7F8';
            logoContainer.style.filter = 'drop-shadow(0px 0.5px 0.5px #EFEFEF) drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5))';
            logoContainer.style.borderRadius = '11px';
          }

          const user_name = snapshot.val().full_name;

          alert('Zalogowano się jako ' + user_name + '!');

          showProfileConfigButton();
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
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

function showProfileConfigButton() {
  const profileConfigButton = document.getElementById('profile-config_btn');
  if (profileConfigButton) {
    profileConfigButton.style.display = 'block';
  }
}

function openProfileModal() {
  const overlay = document.getElementById('overlay');
  const profileModal = document.getElementById('profileModal');
  const profileConfigButton = document.getElementById('profile-config_btn');

  overlay.style.display = 'block';
  profileModal.style.display = 'block';
  profileConfigButton.style.display = 'block';
}

function closeProfileModal() {
  const overlay = document.getElementById('overlay');
  const profileModal = document.getElementById('profileModal');

  overlay.style.display = 'none';
  profileModal.style.display = 'none';
}

function updateProfile() {
  const newPassword = document.getElementById('newPassword').value;
  const newName = document.getElementById('newName').value;
  const newAvatarInput = document.getElementById('avatar_input');
  const avatarInput = newAvatarInput.files[0];
  const logoContainer = document.getElementById('logo_container');

  if (newPassword) {
    const user = auth.currentUser;

    user.updatePassword(newPassword)
      .then(function () {
        alert('Hasło zaktualizowane pomyślnie!');
      })
      .catch(function (error) {
        alert('Błąd podczas aktualizacji hasła: ' + error.message);
      });
  }

  if (newName) {
    const user = auth.currentUser;

    user.updateProfile({
      displayName: newName
    })
      .then(function () {
        alert('Nazwa zaktualizowana pomyślnie!');
      })
      .catch(function (error) {
        alert('Błąd podczas aktualizacji nazwy: ' + error.message);
      });
  }

  if (avatarInput && !avatarSelectedFromDiv) {
    const reader = new FileReader();

    reader.onload = function (e) {
      logoContainer.style.backgroundImage = `url('${e.target.result}')`;
    };

    reader.readAsDataURL(avatarInput);

    const user = auth.currentUser;

    database.ref('users/' + user.uid).update({ avatar: avatarInput.name })
      .then(function () {
        alert('Avatar zaktualizowany pomyślnie!');
        
        avatarSelectedFromDiv = false;

      })
      .catch(function (error) {
        alert('Błąd podczas aktualizacji avatara: ' + error.message);
      });
  }
}
