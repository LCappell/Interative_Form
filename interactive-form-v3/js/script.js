//Variable declarations
const name = document.querySelector("#name");
const otherJobRole = document.querySelector("#other-job-role");
const title = document.querySelector("#title");
const color = document.querySelector("#color");
const design = document.querySelector("#design");
const activities = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
const payment = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
const payPal = document.querySelector("#paypal");
const bitCoin = document.querySelector("#bitcoin");
const form = document.querySelector("form");
const ccNum = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const activitiesCheckBox = document.querySelectorAll("#activities input[type='checkbox']");
const email = document.querySelector("#email");
const creditCardBox = document.querySelector(".credit-card-box");
const ccHint = document.querySelector(".cc-hint");
const zipHint = document.querySelector(".zip-hint");
const cvvHint = document.querySelector(".cvv-hint");
const nameHint = document.querySelector(".name-hint");
const emailHint = document.querySelector(".email-hint");
const activitiesHint = document.querySelector(".activities-hint");
const hint = document.querySelectorAll(".hint");
const colorSec = document.querySelector('.shirt-colors')
const colorOptions = color.children

//this line ensures the name input is focused on load
name.focus();
//this line hides the other job role section
otherJobRole.style.display = "none";
colorSec.hidden = true


//if other is selected other job role section will appear
title.addEventListener("change", (e) => {
    if (e.target.value === "other") {
        otherJobRole.style.display = "block";
    } else {
        otherJobRole.style.display = "none";
    }
})




//controls which color options are available based on the time the user selects
design.addEventListener('change', (e) => {
    const target = e.target
  
    // Enable 'Color' menu
    colorSec.hidden = false;
  
    for (let i = 1; i < colorOptions.length; i++) {
      const colorTheme = colorOptions[i].getAttribute('data-theme');
  
      colorOptions[0].textContent = 'Please select a color';
      color.value = 'Please select a color';
  
      if (target.value === colorTheme) {
        colorOptions[i].hidden = false;
      }
      else {
        colorOptions[i].hidden = true;
      }
    }
  });

//this section tracks the total cost in a variable
let totalCost = 0;
activities.addEventListener("change", (e) => {
    if (e.target.checked === true) {
        totalCost += parseInt(e.target.dataset.cost);
    } else {
        totalCost -= parseInt(e.target.dataset.cost);
    }
    activitiesCost.textContent = `Total: $${totalCost}`;
})

//this section displays the user payment options
payment.children[1].defaultSelected = true;
if (payment.children[1].defaultSelected) {
    payPal.style.display = "none";
    bitCoin.style.display = "none";
}
payment.addEventListener("change", (e) => {
    const selection = e.target.value;
    if (selection === "paypal") {
        payPal.style.display = "block";
        creditCard.style.display = "none";
        bitCoin.style.display = "none";
    } else if (selection === "credit-card") {
        creditCard.style.display = "block";
        payPal.style.display = "none";
        bitCoin.style.display = "none";
    } else {
        bitCoin.style.display = "block";
        creditCard.style.display = "none";
        payPal.style.display = "none";
    }
})

//form section
form.addEventListener("submit", (e) => {
    const activitiesBox = document.querySelectorAll("#activities-box input");
    //name validator helper function
    function nameValidator(event) {
        if (name.value.length === 0) {
            name.parentElement.classList.add("not-valid");
            name.parentElement.classList.remove("valid");
            nameHint.style.display = "block";
        } else {
            name.parentElement.classList.add("valid");
            name.parentElement.classList.remove("not-valid");
            nameHint.style.display = "none";
        }
    }
    //function call
    nameValidator();

    //emailValidator function to validate email
    function emailValidator() {
        const re = /\S+@\S+\.\S+/;
        const result = (re.test(email.value))
        if (result === false) {
            email.parentElement.classList.add("not-valid");
            email.parentElement.classList.remove("valid");
            emailHint.style.display = "block";
        } else {
            email.parentElement.classList.add("valid");
            email.parentElement.classList.remove("not-valid");
            emailHint.style.display = "none";
        }
    }
    //function call
    emailValidator();

    //activites validator function
    function activitiesValidator() {
        let checkedActivities = 0;
        for (let i = 0; i < activitiesBox.length; i++) {
            if (activitiesBox[i].checked) {
                checkedActivities += 1;
            }
        }
        if (checkedActivities < 1) {
            activities.classList.add("not-valid");
            activities.classList.remove("valid");
            activitiesHint.style.display = "block";

        } else if (checkedActivities >= 1) {
            activities.classList.add("valid");
            activities.classList.remove("not-valid");
            activitiesHint.style.display = "none";
        }
    }
    //function call
    activitiesValidator();
    
    //card validator function
    function cardValidator() {
        const cardDigits = "0123456789";
        const cardDigitTester = /[^0-9]/g //Used W3schools.com https://www.w3schools.com/jsref/jsref_regexp_not_0-9.asp
        const zipTester = /^\d{5}$/ //Used StackOverflow https://stackoverflow.com/questions/11127515/regex-for-5-digit-zip-or-empty   (username: Registered User)
        const cvvTester = /^\d{3}$/ //Used StackOverflow https://stackoverflow.com/questions/11127515/regex-for-5-digit-zip-or-empty   (username: Registered User)
        if (creditCard.style.display !== "none") {
            if (ccNum.value.length >= 13 && ccNum.value.length <= 16 && !cardDigitTester.test(ccNum.value)) {
                    ccNum.parentElement.classList.add("valid");
                    ccNum.parentElement.classList.remove("not-valid");
                    ccHint.style.display = "none";
                } else {
                    ccNum.parentElement.classList.add("not-valid");
                    ccNum.parentElement.classList.remove("valid");
                    ccHint.style.display = "block";
                }
            if (zipTester.test(zip.value) === true) {
                zip.parentElement.classList.add("valid");
                zip.parentElement.classList.remove("not-valid");
                zipHint.style.display = "none";
            } else {
                zip.parentElement.classList.add("not-valid");
                zip.parentElement.classList.remove("valid");
                zipHint.style.display = "block";
            }
            if (cvvTester.test(cvv.value) === true) {
                cvv.parentElement.classList.add("valid");
                cvv.parentElement.classList.remove("not-valid");
                cvvHint.style.display = "none";
            } else {
                cvv.parentElement.classList.add("not-valid");
                cvv.parentElement.classList.remove("valid");
                cvvHint.style.display = "block";
            } 
        }
    }
    //function call
    cardValidator();
 
    //this loop checks if any of the required fields have a class of "not-valid".
    //if so, form submission is prevented
    for (let i = 0; i < hint.length; i++) {
        if (hint[i].parentElement.classList.contains("not-valid")) {
            e.preventDefault();
        }
    }
})

//blur function to aid in accessiblity
function blur(e) {
    const blurLabel = e.target.parentElement
    blurLabel.classList.remove("focus");
}

//focus function to aid in accessiblity
function focus(e) {
    const focusLabel = e.target.parentElement
    focusLabel.classList.add("focus");
}

//add the blur and focus event listeners to the each element in the activitiesCheckBox nodelist
for (let i = 0; i < activitiesCheckBox.length; i++) {
    activitiesCheckBox[i].addEventListener("blur", blur);
    activitiesCheckBox[i].addEventListener("focus", focus);
}