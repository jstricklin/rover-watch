// const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-06-03&api_key="
const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
const endURL = "/photos?earth_date="
const key = "&api_key=81Uv2Mrsi3Ovgn4L6FzNVwVdKhOXesellboQvDbW"
document.addEventListener("DOMContentLoaded", render())

function render(){
    const faveList = document.querySelector(".faveList")
    const faveText = document.querySelector(".faveTitle").innerHTML
    const info = document.querySelector("#info")

    const date = document.querySelector("#date")

    updateStatus("Online","has-text-success")
    checkLocalStorage(faveList, faveText)
    updateCount(faveText)
    date.value = todaysDate()
    date.setAttribute("max",todaysDate())
    document.querySelector("#rover-select").addEventListener("change",()=>{

        let rover = document.querySelector("#rover-select").value
        switch (rover) {
            case "curiosity" :
                date.value = todaysDate();
                updateStatus("Online", "has-text-success")
                break
            case "opportunity" :
                date.value = '2018-03-16'
                updateStatus("Hibernating due to massive Dust Storm - June/12/2018", "has-text-warning")
                break
            case "spirit" :
                date.value = '2009-11-06'
                updateStatus("Offline since March 22, 2010", "has-text-danger")
                break
        }
    })
    document.querySelector("#addFave").addEventListener("click",()=>{
        let faveRover = document.querySelector("#rover-select").value
        let faveDate = document.querySelector("#date").value
        addFavorite(faveList, faveText, faveRover, faveDate, true)

    })
    document.querySelector("#removeFave").addEventListener("click",()=>{
        let selected = faveList.options[faveList.selectedIndex]
        if (selected == undefined || !selected.hasAttribute("data-rover") || !selected.hasAttribute("data-date")){
            return
        }
        // adding localStorage delete below
        let tempArr = JSON.parse(localStorage.getItem(selected.getAttribute("data-rover"))).filter(date => date !== selected.getAttribute("data-date"))
        localStorage.setItem(selected.getAttribute("data-rover"), JSON.stringify(tempArr))
        selected.remove()
        updateCount(faveText)
        faveList.options[0].selected = true;
    })
    document.querySelector(".faveList").addEventListener("change", ()=>{
        document.querySelector("#date").value = faveList.options[faveList.options.selectedIndex].getAttribute("data-date")
        document.querySelector("#rover-select").value = faveList.options[faveList.options.selectedIndex].getAttribute("data-rover")

    })
    document.querySelector("#camBtn").addEventListener("click", ()=>{
        let imgContainer = document.querySelector(".image-container")
        while (imgContainer.firstElementChild){
            imgContainer.removeChild(imgContainer.firstElementChild)
        }
        let dateVal = document.querySelector("#date").value
        let rover = document.querySelector("#rover-select").value
        axios.get(`${baseURL}${rover}${endURL}${dateVal}${key}`)
            .then(res => {
                if (res.data.photos.length<1){
                    info.style.display = "block"
                }

                res.data.photos.map(photo => {
                    let img = document.createElement("img")
                    img.src = photo.img_src
                    img.className="rover-img"
                    imgContainer.appendChild(img)
                })
            }).catch(err => {
                info.style.display = "block"
            })
    })
}
function updateCount(faveText) {
    const favesLength = document.querySelectorAll(".faveList option").length - 1
    document.querySelector(".faveTitle").innerHTML = `${faveText}${favesLength}`
}
function checkLocalStorage(faveList, faveText){
    if (localStorage.length > 0) {
        Object.keys(localStorage).map(key => {
            JSON.parse(localStorage.getItem(key)).map(val =>{
                addFavorite(faveList, faveText, key, val, false)
            })

        })
    }
}
function addFavorite(faveList, faveText, faveRover, faveDate, newEntry = false){
        // code below ignores blank and duplicate entries
        if (faveDate === ""){
            return
        } else {
            for (let i = 0; i < document.querySelectorAll(".faveList option").length; i++){
                if (`${faveRover} - ${faveDate}` === faveList.options[i].value){
                    return;
                }
            }
        }
        // valid entry below
        let fave = document.createElement("option")
        fave.id = `${faveRover}-${faveDate}`
        fave.setAttribute("data-rover", faveRover)
        fave.setAttribute("data-date", faveDate)
        fave.innerHTML = `${faveRover} - ${faveDate}`

        faveList.appendChild(fave)
        updateCount(faveText)
    if (newEntry){
        // local storage stuff below
        let dateArr = JSON.parse(localStorage.getItem(faveRover)) || []
        dateArr.push(faveDate)
        localStorage.setItem(faveRover,JSON.stringify(dateArr))
    }
}
function todaysDate(){
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()
    if (dd < 10){
        dd = '0'+dd
    }
    if (mm < 10){
        mm = '0'+mm
    }
    today = `${yyyy}-${mm}-${dd}`
    return today
}
function updateStatus(roverStatus, color){

    let status = document.querySelector("#rover-status")
    let statusTxt = `Rover Status: `
    status.innerHTML = `<p>${statusTxt}<br/><bold class=${color}>${roverStatus}</bold></p>`
}
