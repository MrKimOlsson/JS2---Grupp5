const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const form = document.querySelector('#form')
const errands = []
const errandList = document.querySelector('#output')
const subject = document.querySelector('#subject');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

// Handle submit
const handleSubmit = e => {
  e.preventDefault()
  //Validera formuläret.

  const newErrand = {
    subject: document.querySelector('#subject').value,
    email: document.querySelector('#email').value,
    message: document.querySelector('#message').value,
    }
  
    subject.value = "";
    message.value = "";
    email.value = "";

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
  });
}

  form.addEventListener('submit', handleSubmit)
  