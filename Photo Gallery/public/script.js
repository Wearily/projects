// var headers = document.getElementsByClassName("img-name")
// var descriptions = document.getElementsByClassName("description")
// var locations = document.getElementsByClassName("location")

// headers.forEach((e)=>{
//   e.addEventListner(())
// })

function _update(element) {
  console.log(element.dataset.id)
  var data = { name: element.innerText}
  let link = `/update/${element.dataset.id}`
  fetch(link, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type":"application/json"
    }
  })
}

function debounce(func, timeout = 500){
  let timer
  return (...args)=>{
    clearTimeout(timer)
    timer = setTimeout (()=> { func.apply(this, args)}, timeout)
  }
}

const updateItem = debounce((element)=> _update(element))
