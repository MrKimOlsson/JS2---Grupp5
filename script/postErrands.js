const handleSubmit = e => {
    e.preventDefault()
    const newPost = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        company: {
        name: document.querySelector('#company').value,
        }

    }


    fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then(data => {
        users.push(data)
        const userElement = createUserElement(data)
        userList.appendChild(userElement)
        console.log(newUser)
    });
}

userList.addEventListener('click', removeUser)

form.addEventListener('submit', handleSubmit)