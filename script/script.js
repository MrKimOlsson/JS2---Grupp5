const BASE_URL = 'https://fnd22-shared.azurewebsites.net/api/Cases/';
let errandID = "";
let GetByID = BASE_URL + errandID;
// const ID_URL = 'https://fnd22-shared.azurewebsites.net/api/';
const errands = []
const errandList = document.querySelector('#output')
const container = document.querySelector('#container')
const details = document.querySelector('#details');

// Get cases

// const getData = async () => {

//     try {
//         const res = await fetch(BASE_URL);

//         if(res.status !== 200) {
//             throw new Error(res.statusText)
//         }

//         const data = await res.json();
//         console.log(data);

//         data.forEach(cases => {
//             output.innerHTML += `
//                 <div class="card">
//                     <h3>Subject: ${cases.subject}</h3>
//                     <p>Email: ${cases.email}</p>
//                     <p>Created: ${cases.created}</p><br>
//                     <p>Status: ${cases.status.statussubject}</p>
//                 </div>
//                 `
//         })
//     }

//     catch(err) {
//         console.log(err);
//         output.innerHTML += `
//             <div class="card">
//                 <h3>${err}</h3>
//             </div>
//             `
//     } 
// }

const getData = async (id) => {

    try {
        const res = await fetch(BASE_URL+id);
        console.log('Base url + id = ' + BASE_URL+id)

        if(res.status !== 200) {
            throw new Error(res.statusText)
        }

        const data = await res.json();
        console.log(data);

       
            output.innerHTML += `
                <div class="card">
                    <h3>Subject: ${data.subject}</h3>
                    <p>Email: ${data.email}</p>
                    <p>Created: ${data.created}</p><br>
                    <p>Status: ${data.status.statussubject}</p>
                </div>
                `
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

const listErrands = () => {
    errandList.innerHTML = ''
  
    errands.forEach(errand => {
      
      const errandElement = createErrandElement(errand)
      errandList.appendChild(errandElement)
    })
  }

// __________________________________________


  const createErrandElement = (errandData) => {
    let errand = document.createElement('div')
    errand.id = errandData.id
    errand.classList.add('errand')
  
    let subject = document.createElement('p')
    subject.classList.add('errand_subject')
    subject.innerText = errandData.subject
    
    let message = document.createElement('p')
    message.classList.add('errand_message')
    message.innerText = errandData.message
  
    let email = document.createElement('p')
    email.classList.add('errand_email')
    email.innerText = errandData.email
  
    errand.appendChild(subject)
    errand.appendChild(message)
    errand.appendChild(email)
    return errand
  }

// CLEAR THE DOM! THEN CREATE ELEMENTS FOR DETAILS!
  const createDetailsElement = (errandData) => {
    let errand = document.createElement('div')
    errand.id = errandData.id
    errand.classList.add('errand')
  
    let subject = document.createElement('p')
    subject.classList.add('errand_subject')
    subject.innerText = errandData.subject
    
    let message = document.createElement('p')
    message.classList.add('errand_message')
    message.innerText = errandData.message
  
    let email = document.createElement('p')
    email.classList.add('errand_email')
    email.innerText = errandData.email
  
    errand.appendChild(subject)
    errand.appendChild(message)
    errand.appendChild(email)
    return errand
  }

//   EXPAND ERRAND (Detaljerad lista)

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
  
    // fetch(BASE_URL + e.target.id, {
    //   method: 'DELETE'
    // })
    //   .then(res => {
    //     console.log(res)
    //     if(res.ok) {
    //       e.target.remove()
    //       const index = errands.findIndex(errand => errand.id == e.target.id)
    //       errands.splice(index, 1)
    //       console.log(errands)
    //     }
    // })
  }
  
  errandList.addEventListener('click', expandErrand)
  








//   const removeerrand = e => {
//     if(!e.target.classList.contains('errand')){
//       console.log('klickade inte på en div')
//       return
//     }
  
//     fetch(BASE_URL + e.target.id, {
//       method: 'DELETE'
//     })
//       .then(res => {
//         console.log(res)
//         if(res.ok) {
//           e.target.remove()
//           const index = errands.findIndex(errand => errand.id == e.target.id)
//           errands.splice(index, 1)
//           console.log(errands)
//         }
//       })
//   }
  
//   errandList.addEventListener('click', removeerrand)


// const removeerrand = e => {
//     if(!e.target.classList.contains('errand')){
//       console.log('klickade inte på en div')
//       return
//     }
  
    // fetch(BASE_URL + e.target.id, {
    //   method: 'DELETE'
    // })
    //   .then(res => {
    //     console.log(res)
    //     if(res.ok) {
    //       e.target.remove()
    //       const index = errands.findIndex(errand => errand.id == e.target.id)
    //       errands.splice(index, 1)
    //       console.log(errands)
    //     }
    //   })
//   }
  
//   errandList.addEventListener('click', removeerrand)

























// const getData = async () => {

//     try {
//         const res = await fetch('https://fnd22-shared.azurewebsites.net/api/Cases');

//         if(res.status !== 200) {
//             throw new Error(res.statusText)
//         }

//         const data = await res.json();
//         console.log(data);

//         data.forEach(cases => {
//             output.innerHTML += `
//                 <div class="card">
//                     <h3>Subject: ${cases.subject}</h3>
//                     <p>Message: ${cases.message}</p>
//                     <p>Comments: ${cases.comment}</p>
//                     <p>Email: ${cases.email}</p>
//                     <p>Created: ${cases.created}</p><br>
//                     <p>Status: ${cases.status.statussubject}</p>
//                     <p>Status Id: ${cases.status.id}</p>
//                     <p>Case Id: ${cases.id}</p>
//                 </div>
//                 `
//         })
//     }

//     catch(err) {
//         console.log(err);
//         output.innerHTML += `
//             <div class="card">
//                 <h3>${err}</h3>
//             </div>
//             `
//     } 
// }

// getData();