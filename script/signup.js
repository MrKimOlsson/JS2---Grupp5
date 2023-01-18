const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const adress = document.querySelector('#adress');
const postal = document.querySelector('#postal');
const checkbox = document.querySelector('#checkbox');
const formContent = document.querySelector('.form-content')
const output = document.querySelector('.text-out')

const validateUserfirstName = () => {
  if (firstName.value.length < 2) {
    firstName.classList.add('error');
    return false;

  } else {
    firstName.classList.remove('error');
    return true;
  }
}

const validateUserlastName = () => {
  if (lastName.value.length < 2) {
    lastName.classList.add('error');
    return false;


  } else {
    lastName.classList.remove('error');
    return true;
  }
}

const validateUserEmail = () => {
  let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.value.trim() === '') {
    email.classList.add('error');
    return false;

  }
  else if (!regEx.test(email.value)) {
    email.classList.add('error');
    return false;

  }
  else {
    email.classList.remove('error');
    return true;
  }

}

const validatePhone = () => {
  if (phone.value.length !== 10) {
    phone.classList.add('error');
    return false;

  } else {
    phone.classList.remove('error');
    return true;
  }
}

const validateAdress = () => {
  if (adress.value.length < 7) {
    adress.classList.add('error');
    return false;

  } else {
    adress.classList.remove('error');
    return true;
  }
}

const validatePostal = () => {
  if (postal.value.length !== 5) {
    postal.classList.add('error');
    return false;

  } else {
    postal.classList.remove('error');
    return true;
  }
}

const validateCheckbox = () => {
  if (!checkbox.checked) {
    checkbox.classList.add('error');
    return false;

  } else {
    checkbox.classList.remove('error');
    return true;
  }
}

const members = []

formContent.addEventListener('submit', e => {
  e.preventDefault()


  const clearForm = () => {
    document.querySelector('#firstName').value = '';
    document.querySelector('#lastName').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#phone').value = '';
    document.querySelector('#adress').value = '';
    document.querySelector('#postal').value = '';
    document.querySelector('#checkbox').checked = false;
  }

  const newUser = []

  newUser[0] = validateUserfirstName('#firstName');
  newUser[1] = validateUserlastName('#lastName');
  newUser[2] = validateUserEmail('#email');
  newUser[3] = validatePhone('#phone');
  newUser[4] = validateAdress('#adress');
  newUser[5] = validatePostal('#postal');
  newUser[5] = validateCheckbox('#checkbox');

  if (newUser.includes(false)) {
    console.log('Your account was not created, something went wrong')
  }
  else {
    console.log('You are now signed up!')
    const member = {
      Firstname: (firstName).value,
      Lastname: (lastName).value,
      Email: (email).value,
      Phone: (phone).value,
      Adress: (adress).value,
      Postal: (postal).value,
    }
    members.push(member);
    console.log(members)

    const thankYou = () => {
      output.innerHTML +=
        `
      <div class="thanks">
        <h3>You are now registered!</h3>
        <h4>Hope you have a great day!</h4>
      </div>
      `
      output.innerHTML = ''
    }
    thankYou()
    clearForm()


  }

})