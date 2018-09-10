<template>
    <section class="main-content p-5">
        <h2 class="main-title text-center pt-2">RoverCam Options</h2>
        <section class="card col-sm-10 mx-auto" name="select-fields">
            <div class="card-header"><a>Pick <span id="bold">Rover</span> and <span id="bold">Date</span> below</a></legend></div>
            <form class="card-body">
                <div class="rover-settings col-sm-6">
                    <select v-on:change="checkStatus" v-model="selectedRover" id="rover-select">
                        <option value="curiosity">Curiosity</option>
                        <option value="opportunity">Opportunity</option>
                        <option value="spirit">Spirit</option>
                    </select>
                    <input v-on:change="selectedFave = 'default'" type="date" v-model="date" onkeydown="return false"name="cam-date" id="date" min="2004-06-10" />
                </div>
                <div id="rover-status">
                    <p>Rover Status:<br/><span id="bold" :class="color">{{roverStatus}}</span></p>
                </div>
                <div>
                    <div class="fave-container">
                        <select  v-on:change="setDate" v-model="selectedFave" class="faveList">
                            <option value="default" disabled class="faveTitle">Favorite Dates - {{favorites.length}}</option>
                            <option v-for="date in favorites" :data-rover="date.rover" :data-date="date.date">{{date.rover}} - {{date.date}}</option>

                        </select>
                        <div>
                            <button v-on:click="addFave" id="addFave"><p>add fave</p></button>        
                            <button v-on:click="removeFave" id="removeFave"><p>remove fave</p></button>        
                        </div>
                    </div>
                </div>
            </form>
            <div class="row d-flex justify-content-center">
                <div class="col-sm-8">
                    <div class="form-container">
                        <button v-on:click="getCams" id="camBtn"><h2>Click here for Rover Cams</h2></button>
                    </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-sm-8">
                    <div id="info" style="display:none">
                        <h3>Whoops!</h3></br><p> No Images for selected date. Please try again.</p>
                    </div>
                    <div v-if="roverJSON" class="image-container">
                        <transition-group name="fade" mode="out-in">
                            <img v-for='photo in roverJSON.photos' :key="photo.img_src" class="rover-img" :src="photo.img_src"/>
                        </transition-group>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    name: "RoverCams",
    data(){
        return {
            statusTxt : "status",    
            roverStatus : "Online",
            date : "",
            selectedRover: "curiosity",
            apiKey: "&api_key=81Uv2Mrsi3Ovgn4L6FzNVwVdKhOXesellboQvDbW",
            baseURL: "https://api.nasa.gov/mars-photos/api/v1/rovers/",
            endURL: "/photos?earth_date=",
            favorites: [],
            rovers: ['curiosity', 'opportunity', 'spirit'],
            selectedFave: 'default',
            roverJSON: null, 
            color: "text-success"
        }
    },
    methods: {
        getCams: function(){
            this.selectedFave = 'default'
            if (this.date == ""){
                return
            }
            return fetch(`${this.baseURL}${this.selectedRover}${this.endURL}${this.date}${this.apiKey}`)
                .then(res => res.json())
                .then(json => this.roverJSON = json)
        },
        checkLocalStorage: function (){
            this.rovers.map(rover => {
                if (localStorage.getItem(rover)){
                    let dateArr = []
                    dateArr = JSON.parse(localStorage.getItem(rover))
                    dateArr.map(date => {
                        this.favorites.push({rover , date})
                        this.favorites.sort()
                    })
                }
            })
        },
        setDate: function(e){
            if (!e){
                let tempDate = new Date()
                tempDate.setDate(tempDate.getDate()-3)
                tempDate = tempDate.toLocaleDateString().split('/')

                let day = tempDate[1] < 10 ? '0' + tempDate[1] : tempDate[1] 
                let month = tempDate[0] < 10 ? '0' + tempDate[0] : tempDate[0] 
                let year = tempDate[2]

                this.date = `${year}-${month}-${day}`
            } else {
                this.date = e.target.options[e.target.selectedIndex].getAttribute('data-date')
                this.selectedRover = e.target.options[e.target.selectedIndex].getAttribute("data-rover")
            }
        },
        addFave: function(event){
            event.preventDefault()
            if (this.date === "") {
                return
            } 
            if (localStorage.getItem(this.selectedRover)){
                if (JSON.parse(localStorage.getItem(this.selectedRover)).includes(this.date)){
                    return
                }
            }
            let favesArray = this.favorites
            let rover = this.selectedRover
            let date = this.date
            favesArray.push({rover: rover, date: date})
            favesArray.sort()
            this.favorites = favesArray;
            let datesArr = JSON.parse(localStorage.getItem(rover)) || []
            datesArr.push(date)
            localStorage.setItem(rover, JSON.stringify(datesArr))

        },
        removeFave: function(event){
            event.preventDefault()
            let selected = document.querySelector(".faveList")
            if (selected.selectedIndex == 0){
                return
            }
            let faves = this.favorites
            faves.splice(selected.selectedIndex-1, 1)
            this.favorites = faves 
            this.favorites.sort()
            //remove local storage below
            let dateArr = JSON.parse(localStorage.getItem(this.selectedRover)).filter(date => date !== this.date)
            this.selectedFave = 'default'
            localStorage.setItem(this.selectedRover, JSON.stringify(dateArr))
        },
        checkStatus: function (e){
            let rover = e.target.options[e.target.selectedIndex].value
            switch (rover) {
                case "curiosity" :
                    this.roverStatus ="Online"
                    this.color="text-success"
                    break
                case "opportunity" :
                    this.date = '2018-03-16'
                    this.color="text-warning"
                    this.roverStatus ="Hibernating due to massive Dust Storm - June/12/2018"
                    break
                case "spirit" :
                    this.color = "text-danger"
                    this.date = '2009-11-06'
                    this.roverStatus="Offline since March 22, 2010"
                    break
            }

        }
    },
    mounted(){
        this.setDate()
        this.checkLocalStorage()
    }
}

</script>
<style>

</style>
