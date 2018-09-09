<template>
    <div id="app">
        <div class="container">
            <div class="row d-flex justify-content-center">
                <main class="col-sm-10 pt-3">
                <Header></Header>
                <NavBar class="pt-3 main-nav" v-on:clicked="linkClicked"></NavBar>
                <section class="main">
                    <router-view/>
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
    methods: {
        linkClicked: function (e){
            console.log(e)
        }
    },
    mounted(){

    }
}
</script>
<style>
    
</style>
