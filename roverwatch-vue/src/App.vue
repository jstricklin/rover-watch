<template>
    <div id="app">
        <div class="container">
            <div class="row d-flex justify-content-center">
                <main class="col-sm-10 pt-3">
                <Header></Header>
                <NavBar class="pt-3 main-nav"></NavBar>
                <section class="main">
                    <transition name='fade' mode="out-in" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter">
                        <router-view/>
                    </transition>
                </section>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './components/Header' 
import NavBar from './components/NavBar'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/normalize.css'
import './styles/main.css'

export default {
    name: 'App',  
    components: {
        Header,
        NavBar,
    },
    data(){
        return {
            prevHeight: 0,
        }
    },
    methods: {
        beforeLeave: function(){
            let element = document.querySelector(".main")
            this.prevHeight = getComputedStyle(element).height
        },    
        enter: function(){
            let element = document.querySelector(".main")
            const { height } = getComputedStyle(element)
            element.style.height = this.prevHeight

            setTimeout(() => {
                element.style.height = height
            })
        },    
        afterEnter: function(){
            let element = document.querySelector(".main")
            element.style.height  = 'auto'
        },    
    },
    mounted(){

    }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: -1.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
    
</style>
