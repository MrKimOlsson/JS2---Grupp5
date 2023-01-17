const id = new URLSearchParams(window.location.search).get('id')
const errands = []

console.log(id)

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';

const output = document.querySelector('#output');


const getPost = async () => {
  const res = await fetch(BASE_URL + id)
  const post = await res.json()

  console.log(post)

    //Lägg till ett nytt element i output
    output.appendChild(createCardElement(post))
}

getPost()

// Skapa ett card element med information från post > från databsen
const createCardElement = (post) => {
  const card = document.createElement('div')
  card.className = 'card'

  const subject = document.createElement('h2')
  subject.innerText = post.subject
  const message = document.createElement('p')
  message.innerText = post.message

  card.appendChild(subject)
  card.appendChild(message)

  return card
}