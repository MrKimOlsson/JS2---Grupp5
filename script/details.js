const id = new URLSearchParams(window.location.search).get('id')
const btnSubmitDetails = document.querySelector('#d-submit')
const detailsForm = document.querySelector('#detailsForm')
// const errands = []
const sortedComments = []
let statusID = "";

console.log(id)

const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
const COMMENT_URL = 'https://fnd22-shared.azurewebsites.net/api/Comments';

const output = document.querySelector('#output');

const getPost = async () => {
  
  try{
    const res = await fetch(BASE_URL + id)
    const post = await res.json()

    console.log(post)

    //Lägg till ett nytt element i output
    output.appendChild(createCardElement(post))
  }
  catch(err) {
    console.log(err);
    output.innerHTML += `
        <div class="card">
            <h3>${err}</h3>
        </div>
        `
  } 
}

getPost()

// Create card to display post from DB
const createCardElement = (post) => {
  const cardDetails = document.createElement('div')
  cardDetails.className = 'cardDetails'

  const cardHeader = document.createElement('div')
  cardHeader.className = 'cardHeader'

  const messageDiv = document.createElement('div')
  messageDiv.className = 'messageDiv'

  const mailDiv = document.createElement('div')
  mailDiv.className = 'mailDiv'

  const subject = document.createElement('h3')
  subject.innerText = post.subject

  const time = document.createElement('p');
  const date = new Date(post.created);
  time.innerText = date.toLocaleString()
  time.classList.add('timeText');

  const messageHeading = document.createElement('p')
  messageHeading.innerHTML = '<b>Message: </b>'

  const message = document.createElement('p')
  message.innerText = post.message

  const mailHeading = document.createElement('p')
  mailHeading.innerHTML = '<b>Email: </b>'

  const email = document.createElement('p')
  email.innerText = post.email


  // ADD DIV FOR STATUS
  const statusSection = document.createElement('div')
  statusSection.classList.add('statusSection');

  const statusHeading = document.createElement('p')
  statusHeading.innerHTML = '<b>Status: </b>'

  const status = document.createElement('p')
  status.classList.add('errand_status')
  status.innerText = post.status.statusName

  

  // Status color
  const statusColor = document.createElement('div')
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
    
  cardDetails.appendChild(statusSection)
  statusSection.appendChild(statusColor)
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

  
   // Add Comment text input
  let comment = document.createElement('INPUT')
  comment.setAttribute("type", "text");
  comment.setAttribute("id", "comment");
  comment.classList.add('textInput');

   // Add mail text input
   let commentEmail = document.createElement('INPUT')
   commentEmail.setAttribute("type", "text");
   commentEmail.setAttribute("id", "commentEmail");
   commentEmail.classList.add('textInput');

  //  Add submit button to details form
  let detailsSubmit = document.createElement('button');
  detailsSubmit.setAttribute("name", "btb-d-submit");
  detailsSubmit.setAttribute("value", "submitDetails");
  detailsSubmit.setAttribute("id", "d-submit");
  detailsSubmit.innerText = "Submit";
  detailsSubmit.classList.add('cardButtons')
  detailsSubmit.classList.add('btnSubmitDetails');

  //  Add close button to details card
  let btnCloseDetails = document.createElement('button');
  btnCloseDetails.setAttribute("name", "close-details");
  btnCloseDetails.setAttribute("id", "btn-close-details");
  btnCloseDetails.setAttribute("onclick", "window.location.href='errands.html'");
  btnCloseDetails.innerText = "Close";
  btnCloseDetails.classList.add('cardButtons')
  btnCloseDetails.classList.add('btnCloseDetails');


  // Display everything on the card
  cardDetails.appendChild(cardHeader)
  cardHeader.appendChild(subject)
  cardHeader.appendChild(time)
  cardDetails.appendChild(messageDiv)
  messageDiv.appendChild(messageHeading)
  messageDiv.appendChild(message)
  cardDetails.appendChild(mailDiv)
  mailDiv.appendChild(mailHeading)
  mailDiv.appendChild(email)
  cardDetails.appendChild(statusSection)
  statusSection.appendChild(statusHeading)
  statusSection.appendChild(statusColor)
  statusSection.appendChild(status)

    // Sort comments function
  post.comments.forEach(e => {
    return post.comments.sort((a, b) => {
    return new Date(b.created) - new Date(a.created);
    })
  })

  console.log(comment)
  // Push comments to a sorted array of comments
  post.comments.forEach(comment => {
    
    sortedComments.push(comment)

  })

//   Print out sorted comments array
  sortedComments.forEach(data => {

    cardDetails.innerHTML += `
    <p><b>Comment:</b> ${data.message}</p><br>
    <p>${data.created = new Date}</p><br>
    `
    // cardDetails.appendChild(commentTime);
  })

  // Display radio section
  radioSection.innerHTML += `<h4>Change status:</h4>`
  radioSection.innerHTML += `<p>Not started:</p>`
  radioSection.appendChild(statusNotStarted)
  radioSection.innerHTML += `<p>Pending:</p>`
  radioSection.appendChild(statusPending)
  radioSection.innerHTML += `<p>Done:</p>`
  radioSection.appendChild(statusDone)

  // Add heading, comment input, radioSection & submit btn to detailsForm
  detailsForm.innerHTML += `<h4>Comment:</h4>`
  detailsForm.appendChild(comment)
  detailsForm.innerHTML += `<h5>Email:</h5>`
  detailsForm.appendChild(commentEmail)
  detailsForm.appendChild(radioSection)
  detailsForm.appendChild(detailsSubmit)
  
  // Add detailsForm to card
  cardDetails.appendChild(detailsForm)
  cardDetails.appendChild(btnCloseDetails)

  // Add event listener to the comment form
  // btnCloseDetails.addEventListener('click', href="errands.html")
  detailsForm.addEventListener('submit', commentSubmit)
  return cardDetails
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
  try{
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
    try{
      fetch(COMMENT_URL, commentOptions)
      .then((commentRes) => console.log(commentRes))

      document.querySelector('.textInput').value = "";
      document.querySelector('#commentEmail').value = "";

      // Reloads the page after the comment 
      setTimeout(() => {
        window.location.reload();
      }, "400")

      setTimeout();
        
      
    } 

    // Catch error - output error message
    catch(err) {
      console.log(err);
      output.innerHTML += `
          <div class="card">
              <h3>${err}</h3>
          </div>
          `
    } 
    
   
  

  // Catch error - output error message
  }
  catch(err) {
    console.log(err);
    output.innerHTML += `
        <div class="card">
            <h3>${err}</h3>
        </div>
        `
  }   
 

}
