const id = new URLSearchParams(window.location.search).get('id')
const btnSubmitDetails = document.querySelector('#d-submit')
const detailsForm = document.querySelector('#detailsForm')
const errands = []
let statusID = "";

console.log(id)

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENT_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments';

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

  const subject = document.createElement('h3')
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

  // Add children to parent
  statusSection.appendChild(status)
  statusSection.appendChild(statusColor)

  // Loop through the comments array
  // For each comment:
  // Print comment message and date of each comment
  post.comments.forEach(comment => {
    console.log("Comments: " + comment.message)
    card.innerHTML += `
      <p><b>Comment:</b> ${comment.message}</p><br>
      <p><b>Time:</b> ${comment.created}</p><br>
  `
  });
    
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

  // Display radio section
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

   // Add mail text input
   let commentEmail = document.createElement('INPUT')
   commentEmail.setAttribute("type", "text");
   commentEmail.setAttribute("id", "commentEmail");
   commentEmail.classList.add('CommentEmail');

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
  detailsForm.innerHTML += `<h5>Email:</h5>`
  detailsForm.appendChild(commentEmail)
  detailsForm.appendChild(radioSection)
  detailsForm.appendChild(detailsSubmit)
  
  // Add detailsForm to card
  card.appendChild(detailsForm)

  // Add event listener to the comment form
  detailsForm.addEventListener('submit', commentSubmit)
  return card
}

// Handle submit
const commentSubmit = e => {
  // prevent reload
  e.preventDefault()

  console.log(e.target.comment.value);
  console.log(e.target);

  // declair variables
  let statusID = 0;
  let comment = "";
  
  // Check if there is a comment to submit
  if(e.target.comment.value == "") {
    console.log("No comment to submit - Add a comment")
  }

  console.log("Comment: " + e.target.comment.value)
  comment = e.target.comment.value
  console.log(comment);

  // Check what to change status ID into
  // if status: not started
  if(e.target.notStarted.checked){
    console.log("Set status: not started")
    statusID = 1;
  }
  // if status: pending
  else if(e.target.pending.checked){
    console.log("Set status: pending")
    statusID = 2;
  }
  // if status done
  else if(e.target.done.checked){
    console.log("Set status: done")
    statusID = 3;
  }
  
  // Info to change status ID
  let changeID = {
    id: id,
    statusID: statusID,
  }

  // Options for fetch method
  let options = {
    method: "PUT",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(changeID)
  }

  // Fetch method to change status ID
  fetch(BASE_URL+id, options)
  .then((response) => response.json())

  // COMMENT

  // Comment post payload - CONTENT TO POST
  const addComment = {
    caseID: id,
    email: document.querySelector('#commentEmail').value,
    message: comment,
  }

  // Options for fetch method
  let commentOptions = {
    method: "POST",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(addComment)
  }

  // Fetch method to change status ID
  fetch(COMMENT_URL, commentOptions)
  .then((commentRes) => console.log(commentRes))   
}
