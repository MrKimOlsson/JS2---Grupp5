const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
console.log(BASE_URL);
const errands = []


const output = document.querySelector('#output');



const getPosts = async () => {
  const res = await fetch(BASE_URL)
  const posts = await res.json()
  const sortedPosts = sortPosts(posts);


  sortedPosts.forEach(post => {
    errands.push(post)
    //Lägg till ett nytt element i output
    output.appendChild(createCardElement(post))
  })

  console.log(posts)
}

const sortPosts = (posts) => {
  return posts.sort((a, b) => {
    return new Date(b.created) - new Date(a.created);
  });

}


getPosts()

const createCardElement = (post) => {
  const card = document.createElement('a')
  card.className = 'card'

  // card.href = `details.html?id=${post.id}`
  card.setAttribute('href', `details.html?id=${post.id}`)

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

  if (post.statusId == 3) {
    statusColor.classList.add('green')
  }
  else if (post.statusId == 2) {
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





