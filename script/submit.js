const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const form = document.querySelector('#form')
const errands = []
const errandList = document.querySelector('#output')

const subject = document.querySelector('#subject');
const email = document.querySelector('#email');
const message = document.querySelector('#message');



// Handle submit
const handleSubmit = e => {
    e.preventDefault();
    // tbd Validera formuläret.

const subject = document.querySelector('#subject');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const radioBtn1 = document.querySelector('.radioBtn1');
const radioBtn2 = document.querySelector('.radioBtn2');
const radioBtn3 = document.querySelector('.radioBtn3');
const checkbox = document.querySelector('#checkbox');
let letters = /^[A-Za-z]+$/;
let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const setSuccess = (input) => {
  input.classList.remove('error');
  input.classList.add('success');
  return true;
}

const setError = (input) => {        
  input.classList.add('error');
  input.classList.remove('success');
  input.focus();
  return false;
}

const validateSubject = () => {
  if (subject.value.match(letters)) {
      // console.log('subject funkade')
      return setSuccess(subject.parentElement)
  } else {
      subject.classList.add('error');
      // console.log('Subject funkade ej')
      return setError(subject.parentElement)
  }
}

const validateEmail = () => {
  if (!email.value.match(emailRegex) || email.value === '') {
      // console.log('email tom')
      return setError(email.parentElement)
  }
  else {
      console.log('email funkade')
      return setSuccess(email.parentElement)
  }
}

const validateMessage = () => {
if (message.value === '') {
    // console.log('message funkade ej')
    return setError(message.parentElement)

} else {
    console.log('message OK')
    return setSuccess(message.parentElement)
}
}

const validateRadioBtn = () => {
  radioBtn1.forEach
  if (!radioBtn1.checked && !radioBtn2.checked && !radioBtn3.checked) {
      setError(radioBtn1.parentElement)
      setError(radioBtn2.parentElement)
      setError(radioBtn3.parentElement)
  }
  else {
    setSuccess(radioBtn1.parentElement)
    setSuccess(radioBtn2.parentElement)
    setSuccess(radioBtn3.parentElement)
    return true
  }
}

const validateCheckbox = () => {
if (!checkbox.checked) {
    console.log('checkbox INTE klickad')
    return setError(checkbox)
} else {
    console.log('checkbox klickad')
    return setSuccess(checkbox.parentElement)
}
}

validateSubject();
validateEmail();
validateMessage();
validateRadioBtn();
validateCheckbox();


const errors = [];

for (let i = 0; i < form.length; i++) {
  const inputId = '#' + form[i].id;
  
  if(form[i].type === 'text') {
    errors[i] = validateSubject(inputId)
  }

  else if(form[i].type === 'email') {
    errors[i] = validateEmail(inputId)
  }

  else if(form[i].type === 'radio') {
    errors[i] = validateRadioBtn(inputId)
  }

  else if(form[i].type === 'textarea') {
    errors[i] = validateMessage(inputId)
  }
  else if(form[i].type === 'checkbox') {
    errors[i] = validateCheckbox(inputId)
  }
}

console.log(errors)

if(errors.includes(false)) {
  console.log('fel i formuläret')
  return 
}
console.log('gick fint')


    const newErrand = {
      subject: subject.value,
      email: email.value,
      message: message.value,
      }
    
  
    fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newErrand),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
  
      errands.push(data)
    //   const errandElement = createCardElement(data)
    //   errandList.appendChild(errandElement)
    });

  }
  
//   userList.addEventListener('click', removeUser)
  form.addEventListener('submit', handleSubmit)


  
  