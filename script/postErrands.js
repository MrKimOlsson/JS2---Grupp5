const form = document.querySelector(".form-content")




// fetch('https://fnd22-shared.azurewebsites.net/swagger/v1/swagger.json'), {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: 'User 1'
//     })   
//     .then(res => {
//         return res.json()
//     })
//     .then(data => console.log(data))
//     .catch(error => console.log('ERROR'))
// }



// // Men det borde se ut ungefär såhär:

// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//    body: JSON.stringify({
//      // your expected POST request payload goes here
//       title: "My post title",
//       body: "My post content."
//       })
// })
//   .then(res => res.json())
//   .then(data => {
//    // enter you logic when the fetch is successful
//     console.log(data)
//   })
//   .catch(error => {
//   // enter your logic for when there is an error (ex. error toast)
//    console.log(error)
//   })




// Personligen föredrar jag nog async await metoden. Tycker det är lättare att läsa.
// Det borde se ut något sånt här ungefär:



const asyncPostCall = async (e) => {
    e.preventDefault();
    const newErrand = {
        email: document.querySelector("#email").value,
        subject: document.querySelectorAll(".radio").forEach(radio => {
            radio.value
        }), 
        message: document.querySelector("#message").value,
     
    }
            try {
                const response = await fetch('https://fnd22-shared.azurewebsites.net/api/Cases/', {
                 method: 'POST',
                 body: JSON.stringify(newErrand),
                 headers: {
                   'Content-Type': 'application/json'
                   },

                 });
                 const data = await response.json();
            
                 console.log(data);
               } catch(error) {
            
                  console.log(error)
                 } 
            }

form.addEventListener("submit", asyncPostCall)