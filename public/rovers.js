const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key="
const key = "81Uv2Mrsi3Ovgn4L6FzNVwVdKhOXesellboQvDbW"
document.addEventListener("DOMContentLoaded", render())

function render(){
    console.log(document.querySelector("#camBtn"))
    document.querySelector("#camBtn").addEventListener("click", ()=>{
        axios.get(`${baseURL}${key}`)
            .then(res => {
                console.log(res.data)
                let imgContainer = document.querySelector(".image-container")
                res.data.photos.map(photo => {
                    console.log(photo)
                    let img = document.createElement("img")
                    img.src = photo.img_src
                    img.className="rover-img"
                    imgContainer.appendChild(img)
                })
            })
    })
}
