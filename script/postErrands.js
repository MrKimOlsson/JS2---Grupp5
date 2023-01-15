const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const radioBtn1 = document.querySelector('#radioBtn1');
const radioBtn2 = document.querySelector('#radioBtn2');
const radioBtn3 = document.querySelector('#radioBtn3');
const checkbox = document.querySelector('#checkbox');
const submitBtn = document.querySelector('#submit');
const radioBtn = document.querySelectorAll('.input-group3');
const checkBtn = document.querySelector('.input-group4');
const formContent = document.querySelector('.form-content')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validateFirstName();
    validateLastName();
    validateEmail();
    validateMessage();
    validateRadioBtn();
    validateCheckbox();
})
let letters = /^[A-Öa-ö]+$/;
let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


const validateFirstName = () => {
    if (firstName.value.match(letters) && firstName.value.length >= 2) {
        firstName.classList.remove('error');
        return true;
    } else {
        firstName.classList.add('error');
    }
}

const validateLastName = () => {

    if (lastName.value.match(letters) && lastName.value.length >= 2) {
        lastName.classList.remove('error');
        return true;
    } else {
        lastName.classList.add('error');
    }
}

const validateEmail = () => {
    if (email.value.match(emailRegex)) {
        email.classList.remove('error');
        return true;
    }
    else {
        email.classList.add('error');
    }
}

const validateMessage = () => {
    if (message.value.length < 1) {
        message.classList.add('error');
    } else {
        console.log('message OK')
        message.classList.remove('error');
    }
}

const validateRadioBtn = () => {
    if (!radioBtn1.checked && !radioBtn2.checked && !radioBtn3.checked) {
        radioBtn1.parentElement.classList.add('error');
        radioBtn2.parentElement.classList.add('error');
        radioBtn3.parentElement.classList.add('error');
        console.log('error ffs idiot')
    }
    else {
        console.log('ok u retard')
        radioBtn1.parentElement.classList.remove('error');
        radioBtn2.parentElement.classList.remove('error');
        radioBtn3.parentElement.classList.remove('error');
    }

}

const validateCheckbox = () => {
    if (checkbox.checked) {
        checkBtn.classList.remove('error');
    } else {
        checkBtn.classList.add('error')
    }
}
