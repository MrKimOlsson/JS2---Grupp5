const id = new URLSearchParams(window.location.search).get('id')
const btnSubmitDetails = document.querySelector('#d-submit')
const detailsForm = document.querySelector('#detailsForm')
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

// Create card to display post from DB
const createCardElement = (post) => {
  const card = document.createElement('div')
  card.className = 'card'

  const subject = document.createElement('h2')
  subject.innerText = post.subject

  const message = document.createElement('p')
  message.innerText = post.message

  const email = document.createElement('p')
  email.innerText = post.email

  card.appendChild(subject)
  card.appendChild(message)
  card.appendChild(email)


  // ADD DIV FOR STATUS
  const statusSection = document.createElement('div')
  statusSection.classList.add('statusSection');
  card.appendChild(statusSection)

  const status = document.createElement('p')
    status.classList.add('errand_status')
    status.innerText = post.status.statusName

    // Status color
    let statusColor = document.createElement('div')
      statusColor.classList.add('statusColor')

    if(post.statusId == 3) {
      statusColor.classList.add('green')
    }
    else if(post.statusId == 2) {
      statusColor.classList.add('yellow')
    }
    else {
      statusColor.classList.add('red')
    }

  statusSection.appendChild(status)
  statusSection.appendChild(statusColor)


  // DISPLAY COMMENT AND MODIFIED DATE
  // If no comment but modified
  if(post.comment == undefined && post.modified !== post.created) {
    details.innerHTML += `
          <p><b>Created:</b> ${data.modified}</p><br>
      `
  }
  // If comment but not modified
  else if (post.modified == post.created && post.comment !== undefined) {
    details.innerHTML += `
        <p><b>Comment:</b> ${post.comment}</p><br>
    `
  }
  // Both modified and had a comment
  else if(post.comment !== undefined && post.modified !== post.created) {
    details.innerHTML += `
        <p><b>Comment:</b> ${post.comment}</p><br>
        <p><b>Modified:</b> ${post.modified}</p><br>
    `
  }

  // ADD INPUT FORM TO DETAILS CARD
  const detailsForm = document.createElement('form')
  detailsForm.setAttribute("id", "detailsForm");
  detailsForm.className = 'details_form'

   // ADD DIV FOR RADIO BUTTONS
   const radioSection = document.createElement('div')
   radioSection.classList.add('radioSection');

   // Status not started
   const statusNotStarted = document.createElement('INPUT')
   statusNotStarted.setAttribute("type", "radio");
   statusNotStarted.setAttribute("name", "status");
   statusNotStarted.setAttribute("value", "1");
   statusNotStarted.setAttribute("id", "notStarted");
   statusNotStarted.setAttribute("checked", "checked");
   statusNotStarted.classList.add('statusRadio')

   // Status pending
   const statusPending = document.createElement('INPUT')
   statusPending.setAttribute("type", "radio");
   statusPending.setAttribute("name", "status");
   statusPending.setAttribute("value", "2");
   statusPending.setAttribute("id", "pending");
   statusPending.classList.add('statusRadio')

   // Status done
   const statusDone = document.createElement('INPUT')
   statusDone.setAttribute("type", "radio");
   statusDone.setAttribute("name", "status");
   statusDone.setAttribute("value", "3");
   statusDone.setAttribute("id", "done");
   statusDone.classList.add('statusRadio')

  radioSection.innerHTML += `<h4>Change status:</h4>`
  radioSection.innerHTML += `<p>Not started:</p>`
  radioSection.appendChild(statusNotStarted)
  radioSection.innerHTML += `<p>Pending:</p>`
  radioSection.appendChild(statusPending)
  radioSection.innerHTML += `<p>Done:</p>`
  radioSection.appendChild(statusDone)

   // Add Comment text input
  let comment = document.createElement('INPUT')
  comment.setAttribute("type", "text");
  comment.setAttribute("id", "comment");
  comment.classList.add('comment');

  //  Add submit button to details form
  let detailsSubmit = document.createElement('button');
  detailsSubmit.setAttribute("name", "btb-d-submit");
  detailsSubmit.setAttribute("value", "submitDetails");
  detailsSubmit.setAttribute("id", "d-submit");
  detailsSubmit.innerText = "Submit";
  detailsSubmit.classList.add('btn-d-submit')

  // Add heading, comment input, radioSection & submit btn to detailsForm
  detailsForm.innerHTML += `<h4>Comment:</h4>`
  detailsForm.appendChild(comment)
  detailsForm.appendChild(radioSection)
  detailsForm.appendChild(detailsSubmit)
  
  // Add detailsForm to card
  card.appendChild(detailsForm)
  detailsForm.addEventListener('submit', handleSubmit)

  // Check status checked in radio
  // save checked status in variable
  // pass in to POST object

  return card
}

// TO DO:
// GET ID AND ADD TO URL
// CONTROL METHOD TYPE



// Handle submit

const handleSubmit = e => {
  e.preventDefault()
  // tbd Validera formuläret.
  console.log(postID);
  const newChange = {
    comments: document.querySelector('#comment').value,
    statusID: document.querySelector('#status').value,
    }
  

  fetch(BASE_URL, {
  method: 'POST',
  body: JSON.stringify(newChange),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => {

    errands.push(data)
  });
}

