
const otherjob = document.getElementById('other-job-role')
const jobRole = document.getElementById('title')
const shirtColor = document.getElementById('shirt-colors')
const designList = document.getElementById('design')
const jsPuns = document.querySelectorAll('[data-theme = "js puns"]')
const heartJs = document.querySelectorAll('[data-theme = "heart js"]')
let activitiesCost = document.querySelector('.activities-cost')
const checkbox = document.querySelector('#activities');
const activitiesList = document.getElementById('activities-box')
const creditCard = document.getElementById('credit-card')
const bitcoin = document.getElementById('bitcoin')
const payPal = document.getElementById('paypal')
const payment = document.querySelector('#payment')
const form  = document.querySelector('form')
let nameInput = document.getElementById('name')
let emailInput = document.getElementById('email')
let cardInput = document.getElementById('cc-num')
let zipInput = document.getElementById('zip')
let cvvInput = document.getElementById('cvv')
const activityInputs = checkbox.querySelectorAll('input[type="checkbox"]');
const activitiesAll = activities.querySelectorAll('input[data-day-and-time]');


// This will store the total cost for the activities
let totalCost = 0;

// make the name input focus upon start
nameInput.focus()

// Hide the relevant items until needed
otherjob.hidden = true;
shirtColor.hidden = true;
bitcoin.hidden = true;
payPal.hidden = true


    // Create a event listener so when 'other' is selected the input bar will appear
jobRole.addEventListener('change', e => {
    if(e.target.value === 'other'){
        otherjob.hidden = false
    } else{
        otherjob.hidden = true;
    }
})


designList.addEventListener('change', e => {
    shirtColor.hidden = false
    
    // Loop through the jsPuns items then hide and show necessary items
    for(let i = 0; i < jsPuns.length; i++){

    if(e.target.value === 'js puns'){
        
        jsPuns[i].hidden = false;
    }else{
        jsPuns[i].hidden = true;
    }
    }
    // Loop for heartJs items
    for(let i = 0; i < heartJs.length; i++){

    if(e.target.value === 'heart js'){

        heartJs[i].hidden = false;
       
    }
    else{
        heartJs[i].hidden = true;

    }
}

})





activitiesList.addEventListener('change', e => {


        // Create a variable for the data-costs and + will make it an integer
    let dataCost = +e.target.getAttribute('data-cost');

    // Create a variable for when the checkbox is checked or not
    let isChecked = e.target.checked

        // The neccessary actions for when the box is checked
    if(isChecked){
        totalCost += dataCost
    }
    else{
        totalCost -= dataCost
    }
    // Display final sum 

    activitiesCost.innerHTML = `Total: ${totalCost}`

    activityFilter(e.target)

    activityFilter(e, 'Tuesday 9am-12pm');
    activityFilter(e, 'Tuesday 1pm-4pm');

})





// Add an event to when each item is selected. Only the related information is provided and hide all others info.
payment.addEventListener('change', e => {

    if(e.target.value === 'paypal'){
        payPal.hidden = false
        creditCard.hidden = true;
        bitcoin.hidden = true
    }
    else if(e.target.value === 'bitcoin'){
        payPal.hidden = true
        creditCard.hidden = true;
        bitcoin.hidden = false

    }else{
        payPal.hidden = true
        creditCard.hidden = false;
        bitcoin.hidden = true

    }

})

// Create 2 functions that will add the relevant syling to the valid and non valid form input
// This will be used later if the input field is wrong and does not fit the regex needed
function failed (childElement) {
    const parent = childElement.parentElement;
        parent.classList.add('not-valid');
        parent.classList.remove('valid');
        
}

function passed (childElement) {
    const parent = childElement.parentElement;
        parent.classList.add('valid');
        parent.classList.remove('not-valid');
       
}



    /*
    Here I have added a submit event onto the form. This will now go through each of the required inputs 
    and see whether they match the required inputs using regular expressions. If they do not match, the 'failed' function will be applied.
    If they do match then then 'passed' function will be added. 
    */
form.addEventListener('submit', e => {
    e.preventDefault()


    const nameField = nameInput.value;
    const nameValidate = /^[A-Za-z]+ ?[A-Za-z]+ ?[A-Za-z]+$/i.test(nameField);

    if(!nameValidate) {
        failed(nameInput);
        e.preventDefault();
    } else {
        passed(nameInput);
    }


    const emailField = emailInput.value
    const emailvalid = /^[^@]+@[^@.]+\.[A-Z]+$/i.test(emailField);

    if(!emailvalid){
        failed(emailInput)
        e.preventDefault()
    }else{
        passed(emailInput)
    }

    if(totalCost < 100){
        failed(checkbox)
        e.preventDefault()
    }
    else{
        passed(checkbox)
    }

    // if payment value is credit-card then the follwoing will apply. 

  

        const creditcardField = cardInput.value
        const cardValid = /^{\d}{13,16}$/.test(creditcardField)
        
        if(!cardValid){
            failed(cardInput)
            
        } else{
            passed(cardInput)
        }


        const zipField = zipInput.value
        const zipValid = /^[\d]{5}$/.test(zipField);

        if(!zipValid){
            failed(zipInput)
           
        }else{
            passed(zipInput)
        }

        const cvvField = cvvInput.value
        const cvvValid = /^[\d]{3}$/.test(cvvField);

        if(!cvvValid){
            failed(cvvInput)
           
        }else{
            passed(cvvInput)
        }        
  //  }


})

// loop through all items in the checkbox area and add/remove class name
// Used a forEach method as it is far more readable in this situation. 

activityInputs.forEach(checkbox => {

checkbox.addEventListener('focus', e => {

    
   e.target.parentElement.classList.add('focus')

})

checkbox.addEventListener('blur', e => {

   e.target.parentElement.classList.remove('focus')

})
})




