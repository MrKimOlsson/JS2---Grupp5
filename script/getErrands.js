const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
let errandID = "";
let GetByID = BASE_URL + errandID;
const errands = []
const errandList = document.querySelector('#output')
const container = document.querySelector('#container')
const details = document.querySelector('#details');
const detailsSubmit = document.querySelector('.details-form-submit');

// __________________________________________

// Fetch data based on ID
const getData = async (id) => {
    // Try to fetch data based on ID
    try {
        const res = await fetch(BASE_URL+id);
        console.log('Base url + id = ' + BASE_URL+id)

        if(res.status !== 200) {
            throw new Error(res.statusText)
        }
        const data = await res.json();
        console.log('Got clicked errand:')
        console.log(data);
        
        // Clear DOM
        output.innerHTML = "";

        //  Create elements
        let details = document.createElement('div')
        details.classList.add('details')

        // Status color
        let statusColor = document.createElement('div')
        statusColor.classList.add('statusColor')

        // Status not started
        let statusNotStarted = document.createElement('INPUT')
        statusNotStarted.setAttribute("type", "radio");
        statusNotStarted.setAttribute("name", "status");
        statusNotStarted.setAttribute("value", "not started");
        statusNotStarted.setAttribute("checked", "checked");
        statusNotStarted.classList.add('statusNotStarted')

        // Status pending
        let statusPending = document.createElement('INPUT')
        statusPending.setAttribute("type", "radio");
        statusPending.setAttribute("name", "status");
        statusPending.setAttribute("value", "pending");
        statusPending.classList.add('statusPending')

        // Status done
        let statusDone = document.createElement('INPUT')
        statusDone.setAttribute("type", "radio");
        statusDone.setAttribute("name", "status");
        statusDone.setAttribute("value", "done");
        statusDone.classList.add('statusDone')

        // Comment
        let comment = document.createElement('INPUT')
        comment.setAttribute("type", "text");
        // comment.setAttribute("cols", "30");
        // comment.setAttribute("rows", "5");
        comment.classList.add('comment')

        // Close button
        let btnCloseDetails = document.createElement('button')
        btnCloseDetails.setAttribute("value", "close");
        btnCloseDetails.classList.add('btnCloseDetails')

        console.log("Errand status ID:")
        console.log(data.status.id)

         // Status color
        // If errand status is "done"
        if(data.status.id == 3) {
          statusColor.classList.add('green')
        }
        // If errand status is "started"
        else if(data.status.id == 2) {
          statusColor.classList.add('yellow')
        }
        // If errand status is "not started"
        else if(data.status.id == 1) {
          statusColor.classList.add('red')
        }
        output.appendChild(details)
        

        // If no comment and not modified
        // if(data.comment == undefined && data.modified == data.created) {
          
        details.innerHTML += `
                
              <h3>Subject: ${data.subject}</h3>
              <p><b>Message:</b> ${data.message}</p><br>
              <p><b>Email:</b> ${data.email}</p><br>
              <p><b>Created:</b> ${data.created}</p><br>
              <p><b>Status:</b> ${data.status.statusName}</p>
            `
            details.appendChild(statusColor)

            // If no comment but modified
            if(data.comment == undefined && data.modified !== data.created) {
              details.innerHTML += `
                    <p><b>Created:</b> ${data.modified}</p><br>
                `
            }
            // If comment but not modified
            else if (data.modified == data.created && data.comment !== undefined) {
              details.innerHTML += `
                  <p><b>Comment:</b> ${data.comment}</p><br>
              `
            }
            // Both modified and had a comment
            else if(data.comment !== undefined && data.modified !== data.created) {
              details.innerHTML += `
                  <p><b>Comment:</b> ${data.comment}</p><br>
                  <p><b>Modified:</b> ${data.modified}</p><br>
              `
            }

            // Add comment input text
            details.innerHTML += `<br><b>Comment:<b><br>`
            details.appendChild(comment)
            details.innerHTML += `<br>`

            // Change status radio buttons
            details.innerHTML += `<br><p><b>Change status:</b></p>`
            // Status not started
            details.appendChild(statusNotStarted)
            statusNotStarted.addEventListener('click', e => {
              console.log("Change status to not started")
            })

            // Status pending
            details.appendChild(statusPending)
            statusPending.addEventListener('click', e => {
              console.log("Change status to pending")
            })

            // Status done
            details.appendChild(statusDone)
            statusDone.addEventListener('click', e => {
              console.log("Change status to done")
            })
            details.innerHTML += `<br>`

            // Close button
            details.appendChild(btnCloseDetails)
            btnCloseDetails.addEventListener('click', e => {
              console.log("clicked close")
              listErrands()
            })

      }
    // If can´t fetch by ID = Catch error and output error message
    catch(err) {
        console.log(err);
        output.innerHTML += `
            <div class="card">
                <h3>${err}</h3>
            </div>
            `
    } 
}
// __________________________________________

// Fetch errands and save in array (errands)
// Then go to listErrands function
const getErrand = async () => {
    const res = await fetch(BASE_URL)
    const data = await res.json()
  
    console.log(data)
      data.forEach(errand => {
      errands.push(errand)
    })
    listErrands()
  }

getErrand();

// List errands
const listErrands = () => {
    errandList.innerHTML = ''

    // Add .reverse() to list the array backwards
  
    errands.forEach(errand => {
      
      const errandElement = createErrandElement(errand)
      errandList.appendChild(errandElement)
    })
  }

// __________________________________________

// Create elements to display errand list
  const createErrandElement = (errandData) => {
    let errand = document.createElement('div')
    errand.id = errandData.id
    errand.classList.add('errand')
  
    let subject = document.createElement('p')
    subject.classList.add('errand_subject')
    subject.innerText = errandData.subject
  
    let email = document.createElement('p')
    email.classList.add('errand_email')
    email.innerText = errandData.email

    let status = document.createElement('p')
    status.classList.add('errand_status')
    status.innerText = errandData.status.statusName

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
  
    errand.appendChild(subject)
    errand.appendChild(email)
    errand.appendChild(status)
    errand.appendChild(statusColor)
    return errand
  }
// __________________________________________

//   EXPAND ERRAND ON CLICK (Detaljerad lista)
const expandErrand = e => {
  if(e.target.classList.contains('errand')){
    console.log('Du klickade en div')
    errandID = e.target.id
    console.log('Errand ID: ' + errandID)
    getData(errandID);
    
    return
  }
}

errandList.addEventListener('click', expandErrand)
