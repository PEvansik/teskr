
const todoIncomplete = document.querySelectorAll('.git-compare-icon')
const deleteBtn = document.querySelectorAll('.trash-icon')
const todoComplete = document.querySelectorAll('.checkmark-icon')

console.log(Array.from(todoIncomplete))
console.log(Array.from(deleteBtn))
console.log(Array.from(todoComplete))

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoIncomplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})


async function deleteTodo(){
  const btnClicked = this.parentNode
  const todoId = btnClicked.parentNode.dataset.id
  console.log(todoId)
  try{
      const response = await fetch('/task/deletetask', {
          method: 'delete',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              'todoIdFromJSFile': todoId
          })
      })
      const data = await response.json()
      console.log(data)
      location.reload()
  }catch(err){
      console.log(err)
  }
}

async function markComplete(){
  const btnClicked = this.parentNode
  const todoId = btnClicked.parentNode.dataset.id
  console.log(todoId)
  try{
      const response = await fetch('/task/markcomplete', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              'todoIdFromJSFile': todoId
          })
      })
      const data = await response.json()
      console.log(data)
      location.reload()
  }catch(err){
      console.log(err)
  }
}

async function markIncomplete(){
  const btnClicked = this.parentNode
  const todoId = btnClicked.parentNode.dataset.id
  console.log(todoId)
  try{
      const response = await fetch('/task/markincomplete', {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              'todoIdFromJSFile': todoId
          })
      })
      const data = await response.json()
      console.log(data)
      location.reload()
  }catch(err){
      console.log(err)
  }
}



// console.log(Array.from(testComplete))
// const testComplete = document.querySelectorAll('.not')























// async function createUser(ev) {
//   ev.preventDefault()
//   console.log(ev)
//   let form = ev.currentTarget
//   let formData = new FormData(form)
//   let formUrl = form.action
//   let formBody = Object.fromEntries(formData.entries())

//   const option = new Options('POST', formBody)

//   try {
//     console.log(option)
//     let res = await fetch(formUrl, option)
//     if(!res.ok) return res.json()
//     // const data = await res.json();
//     document.body.innerHTML = await res.text()
//     console.log(res.headers.get('content-type'))
//     // location.reload()

//   }catch(err){
//     console.log(err)
//     console.error(err)
//   } 
// }

// async function logUserIn(ev) {
//   ev.preventDefault()
//   console.log(ev)
//   let form = ev.currentTarget
//   let formData = new FormData(form)
//   let formUrl = form.action
//   let formBody = Object.fromEntries(formData.entries())

//   const option = new Options('POST', formBody)

//   try {
//     console.log(option)
//     let res = await fetch(formUrl, option)
//     console.log(res.headers.get('content-type'))
//     if(!res.ok) return res.json()
//     // const data = await res.json();
//     document.body.innerHTML = await res.text()

//     // location.reload()

//   }catch(err){
//     console.error(err)
//   }
// }

// // async function updateCustomer() {

// //   let formbody = {
// //     name: 'Paul',
// //     number: 08033254657
// //   }
// //   try{
// //     let res = await fetch('/api/persons', options('put', formbody))
// //     if (!res.ok) retun ('Could not update customers details')
// //     let data = await res.json()
// //     console.log(data)

// //   }catch(err) {
// //     console.log(err)
// //   }
// // }

// // async function deleteCustomer() {

// //   let formbody = {
// //     name: 'Paul',
// //     number: 08033254657
// //   }

// //   try{
// //     let res = await fetch(`/api/persons/`, options('delete', formbody))
// //     if (!res.ok) retun ('Could not delete customers details')
// //     let data = await res.json()
// //     console.log(data)

// //   }catch(err) {
// //     console.log(err)
// //   }
// // }

// // function options(op, bodyItem) {
// //   let option = {
// //     method: op,
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify(bodyItem)
// //   }
// // }

// function Options(op, bodyItem) {
//   this.method= op;
//   this.headers= {
//     'Content-Type': 'application/json'
//   };
//   this.body= JSON.stringify(bodyItem)
// }