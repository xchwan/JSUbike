// 程式碼寫這裡
async function creatSearchResult(input) {
  const searchResult = []
  const API =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  const rawData = await fetch(API)
  const users = await rawData.json()
  users.filter((element) => {
    if (element.ar.includes(input)) {
      searchResult.push(`<li class="list-group-item fs-5">
        <i class="fas fa-bicycle"></i>
        ${element.sna.slice(11)}(${element.tot})<br>
        <small class="text-muted">${element.ar}</small>
      </li>`)
    }
  })
  return searchResult
}
async function queryResult(input) {
  const result = await creatSearchResult(input)
  result.forEach((item) =>
    document.querySelector(".siteList").insertAdjacentHTML("beforeend", item)
  )
}
function addList() {
  const input = document.querySelector("#searchKeyword")
  queryResult(input.value)
}
function deleteList() {
  const result = document.querySelector(".siteList")
  while (result.lastChild) {
    result.removeChild(result.lastChild)
  }
}
document.querySelector("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault()
  deleteList()
  addList()
})
