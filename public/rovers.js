// const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-06-03&api_key="
const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
const endURL = "/photos?earth_date="
const key = "&api_key=81Uv2Mrsi3Ovgn4L6FzNVwVdKhOXesellboQvDbW"
document.addEventListener("DOMContentLoaded", render())

function render(){
    const faveList = document.querySelector(".faveList")
    const faveText = document.querySelector(".faveTitle").innerHTML
    checkLocalStorage(faveList, faveText)
    updateCount(faveText)

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
        //reset fave select on ROVER CAM CLICK below
        // faveList.options[0].selected = true;
        let imgContainer = document.querySelector(".image-container")
        while (imgContainer.firstElementChild){
            imgContainer.removeChild(imgContainer.firstElementChild)
        }
        let date = document.querySelector("#date").value
        let rover = document.querySelector("#rover-select").value
        axios.get(`${baseURL}${rover}${endURL}${date}${key}`)
            .then(res => {
                if (res.data.photos.length<1){
                    alert(`Sorry, no images found for ${rover} on ${date}. Please try again.`)
                }

                res.data.photos.map(photo => {
                    let img = document.createElement("img")
                    img.src = photo.img_src
                    img.className="rover-img"
                    imgContainer.appendChild(img)
                })
            }).catch(err => {
                alert(`Sorry, no images found for ${rover} on ${date}. Please try again.`)
            })
    })
}
function updateCount(faveText) {
    const favesLength = document.querySelectorAll(".faveList option").length - 1
    document.querySelector(".faveTitle").innerHTML = `${faveText}${favesLength}`
}
function checkLocalStorage(faveList, faveText){
    console.log(localStorage.length)
    if (localStorage.length > 0) {
        Object.keys(localStorage).map(key => {
            JSON.parse(localStorage.getItem(key)).map(val =>{
                console.log(`${key} date is ${val}`)
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
        console.log(localStorage.getItem(faveRover))
        let dateArr = JSON.parse(localStorage.getItem(faveRover)) || []
        console.log(dateArr)
        dateArr.push(faveDate)
        console.log(dateArr)
        localStorage.setItem(faveRover,JSON.stringify(dateArr))
    }
}
