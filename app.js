// 程式碼寫這裡
async function creatsearchresult(input) {
  const searchresult = []
  const API =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  const rawData = await fetch(API)
  const users = await rawData.json()
  users.filter((element) => {
    if (element.ar.includes(input)) {
      searchresult.push(`<li class="list-group-item fs-5">
        <i class="fas fa-bicycle"></i>
        ${element.sna.slice(11)}<br>
        <small class="text-muted">${element.ar}</small>
      </li>`)
    }
  })
  return searchresult.join(" ")
}
function queryResult(input) {
  const result = creatsearchresult(input)
  result.then((item) =>
    document.querySelector(".siteList").insertAdjacentHTML("afterbegin", item)
  )
}
function addTodo() {
  const input = document.querySelector("#searchKeyword")
  queryResult(input.value)
}
function deleteTodo() {
  const result = document.querySelector(".siteList")
  while (result.lastChild) {
    result.removeChild(result.lastChild)
  }
}
document.querySelector(".btn").addEventListener("click", (event) => {
  event.preventDefault()
  deleteTodo()
  addTodo()
})
