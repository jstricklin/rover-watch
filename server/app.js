var express = require('express')
var cors = require('cors')
var app = express()


const key = "81Uv2Mrsi3Ovgn4L6FzNVwVdKhOXesellboQvDbW"
const baseURL = "https://api.nasa.gov/planetary/apod?api_key="

app.use(cors())

// axios({
//     method:"get",
//     url:`${baseURL}${key}`
//     responseType: "stream"
// })
//     .then(res=>{
//         res.data.pipe(fs.createWriteStream(url))
//     })

