// const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-06-03&api_key="
const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/"
const endURL = "/photos?earth_date="
const key = "&api_key=81Uv2Mrsi3Ovgn4L6FzNVwVdKhOXesellboQvDbW"
document.addEventListener("DOMContentLoaded", render())

function render(){
    let faveList = document.querySelector(".faveList")
    document.querySelector("#addFave").addEventListener("click",()=>{
        let faveRover = document.createElement("p")
        faveRover.innerHTML = document.querySelector("#rover-select").value

        let faveDate = document.createElement("p")
        faveDate.innerHTML = document.querySelector("#date").value
        let fave = document.createElement("li")

        fave.appendChild(faveRover)
        fave.appendChild(faveDate)
        faveList.appendChild(fave)
    })
    document.querySelector("#camBtn").addEventListener("click", ()=>{
        let imgContainer = document.querySelector(".image-container")
        while (imgContainer.firstElementChild){
            imgContainer.removeChild(imgContainer.firstElementChild)
        }
        let date = document.querySelector("#date").value
        let rover = document.querySelector("#rover-select").value
        axios.get(`${baseURL}${rover}${endURL}${date}${key}`)
            .then(res => {
                if (res.data.photos.length<1){
                    console.log(res.data.photos)
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
