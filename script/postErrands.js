fetch('https://fnd22-shared.azurewebsites.net/swagger/v1/swagger.json'), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'User 1'
    })   
    .then(res => {
        return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR'))
}