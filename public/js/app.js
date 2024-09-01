// console.log('Client side JavaScript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// Goal: Fetch weather
// 
// 1. Setup a call to fetch to fetch weather for Boston
// 2. Get the parse JSON response
//    - If error property, print error
//    - If no error property, print location and forecast
// 3. Refresh the brower and test your work

// http://localhost:3333/weather?address=californa

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// Goal: Rendering content to paragraphs
// 
// 1. Select the second massage p from JavaScript
// 2. Just before fetch, render loading message and empty p
// 3. If error, render error
// 4. If no error, render location and forecast
// 5. Test your work! Search for error and for valid locations



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    // Goal: Use input value to get weather
    // 
    // 1. Migrate fetch call into the submit callback
    // 2. Use the search text as the addess query string value
    // 3. Submit the form with a valid and invalid value to test

    messageOne.textContent = search.value
    // messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // messageTwo.textContent = ''


    fetch('http://localhost:3333/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
})