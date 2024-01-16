let select = document.getElementById("select");
let list = document.getElementById("list");
let selectText = document.getElementById("selectText");
let inputfield = document.getElementById("inputfield");

let options = document.getElementsByClassName("options");

select.onclick = function(){
  list.classList.toggle("open");
}

for(option of options){
  optin.onclick = function(){
    selectText.innerHTML = this.innerHTML;
    inputfield.ariaPlaceholder = "Szukaj w: " + selectText.innerHTML;
  }
}
                  
function validateEmail(email) {
                    var re = /\S+@\S+\.\S+/;
                    return re.test(email);
}


function subscribe() {
                const subscriberEmail = document.getElementById("subscriberEmail").value;
            
                const templateParams = {
                  to_email: subscriberEmail,
                  subject: "Nowy subskrybent",
                  body: `Nowy subskrybent o adresie e-mail: ${subscriberEmail}`,
                };
            
                emailjs.send("service_your_emailjs_service_id", "template_your_emailjs_template_id", templateParams)
                  .then(function(response) {
                    console.log("Email wysłany pomyślnie:", response);
                    alert("Dziękuję za subskrypcję! Sprawdź swoją pocztę e-mail w celu potwierdzenia.");
                  }, function(error) {
                    console.error("Error wysyłanie email:", error);
                    alert("Ups! Coś poszło nie tak. Spróbuj ponownie później.");
                  });
}
