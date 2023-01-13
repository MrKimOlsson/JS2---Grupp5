const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
let errandID = "";
let GetByID = BASE_URL + errandID;
const errands = []
const errandList = document.querySelector('#output')
const container = document.querySelector('#container')
const details = document.querySelector('#details');
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
        console.log(data);

        // Clear DOM
        output.innerHTML = "";

        // Status color
        let details = document.createElement('div')
        details.classList.add('details')
        let statusColor = document.createElement('div')
        statusColor.classList.add('statusColor')
        console.log(data.status.id)

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
        if(data.comment == undefined && data.modified == data.created) {
          details.innerHTML += `
                <h3>Subject: ${data.subject}</h3>
                <p>Message: ${data.message}</p>
                <p>Email: ${data.email}</p><br>
                <p>Created: ${data.created}</p>
                <p>Status: ${data.status.statusName}</p>
            
            `
            details.appendChild(statusColor)
        }
        // If no comment but modified
        else if(data.comment == undefined && data.modified !== data.created) {
          details.innerHTML += `
                <h3>Subject: ${data.subject}</h3>
                <p>Message: ${data.message}</p>
                <p>Email: ${data.email}</p><br>
                <p>Created: ${data.created}</p>
                <p>Created: ${data.modified}</p>
                <p>Status: ${data.status.statusName}</p>
            
            `
            details.appendChild(statusColor)
        }
        // If modified but no comment
        else if (data.modified == data.created && data.comment !== undefined) {
          details.innerHTML += `
              <h3>Subject: ${data.subject}</h3>
              <p>Message: ${data.message}</p>
              <p>Email: ${data.email}</p><br>
              <p>Created: ${data.created}</p>
              <p>Comment: ${data.comment}</p><br>
              <p>Status: ${data.status.statusName}</p>
          
          `
          details.appendChild(statusColor)
        }
        // Both modified and had a comment
        else {
          details.innerHTML += `
              <h3>Subject: ${data.subject}</h3>
              <p>Message: ${data.message}</p>
              <p>Email: ${data.email}</p><br>
              <p>Comment: ${data.comment}</p><br>
              <p>Created: ${data.created}</p>
              <p>Modified: ${data.modified}</p>
              <p>Status: ${data.status.statusName}</p>
          
          `
          details.appendChild(statusColor)
        }
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
      console.log(e.target)
      errandID = e.target.id
      console.log('Errand ID: ' + errandID)      
      console.log("get by id: " + GetByID)
      getData(errandID);
      
      return
    }
  }

  errandList.addEventListener('click', expandErrand)