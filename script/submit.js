const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const form = document.querySelector('#form')
const errands = []
const errandList = document.querySelector('#output')


// Skapa ett card element med information från post > från databsen
const createCardElement = (post) => {
  const card = document.createElement('div')
  card.className = 'card'

  const subject = document.createElement('h2')
  subject.innerText = post.subject

  const message = document.createElement('p')
  message.innerText = post.message

  const email = document.createElement('p')
  email.innerText = post.email

  const status = document.createElement('p')
    status.classList.add('errand_status')
    status.innerText = post.status.statusName

    // Status color
    let statusColor = document.createElement('div')
      statusColor.classList.add('statusColor')

    if(errandData.statusId == 3) {
      statusColor.classList.add('green')
    }
    else if(errandData.statusId == 2) {
      statusColor.classList.add('yellow')
    }
    else {
      statusColor.classList.add('red')
    }

  card.appendChild(subject)
  card.appendChild(message)
  card.appendChild(email)
  card.appendChild(status)
  card.appendChild(statusColor)

  return card
}

// Handle submit

const handleSubmit = e => {
    e.preventDefault()
    // tbd Validera formuläret.
  
    const newErrand = {
      subject: document.querySelector('#subject').value,
      email: document.querySelector('#email').value,
      message: document.querySelector('#message').value,
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
  