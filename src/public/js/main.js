
const signup = document.querySelector('#signup-form');
const login = document.querySelector('#login-form')
console.log(login)

// signup.addEventListener('submit', createUser)
// login.addEventListener('submit', logUserIn)

// update.addEventListener('click', updateCustomer)


async function createUser(ev) {
  ev.preventDefault()
  console.log(ev)
  let form = ev.currentTarget
  let formData = new FormData(form)
  let formUrl = form.action
  let formBody = Object.fromEntries(formData.entries())

  const option = new Options('POST', formBody)

  try {
    console.log(option)
    let res = await fetch(formUrl, option)
    if(!res.ok) return res.json()
    // const data = await res.json();
    document.body.innerHTML = await res.text()
    console.log(res.headers.get('content-type'))
    // location.reload()

  }catch(err){
    console.log(err)
    console.error(err)
  } 
}

async function logUserIn(ev) {
  ev.preventDefault()
  console.log(ev)
  let form = ev.currentTarget
  let formData = new FormData(form)
  let formUrl = form.action
  let formBody = Object.fromEntries(formData.entries())

  const option = new Options('POST', formBody)

  try {
    console.log(option)
    let res = await fetch(formUrl, option)
    console.log(res.headers.get('content-type'))
    if(!res.ok) return res.json()
    // const data = await res.json();
    document.body.innerHTML = await res.text()

    // location.reload()

  }catch(err){
    console.error(err)
  }
}

// async function updateCustomer() {

//   let formbody = {
//     name: 'Paul',
//     number: 08033254657
//   }
//   try{
//     let res = await fetch('/api/persons', options('put', formbody))
//     if (!res.ok) retun ('Could not update customers details')
//     let data = await res.json()
//     console.log(data)

//   }catch(err) {
//     console.log(err)
//   }
// }

// async function deleteCustomer() {

//   let formbody = {
//     name: 'Paul',
//     number: 08033254657
//   }

//   try{
//     let res = await fetch(`/api/persons/`, options('delete', formbody))
//     if (!res.ok) retun ('Could not delete customers details')
//     let data = await res.json()
//     console.log(data)

//   }catch(err) {
//     console.log(err)
//   }
// }

// function options(op, bodyItem) {
//   let option = {
//     method: op,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(bodyItem)
//   }
// }

function Options(op, bodyItem) {
  this.method= op;
  this.headers= {
    'Content-Type': 'application/json'
  };
  this.body= JSON.stringify(bodyItem)
}