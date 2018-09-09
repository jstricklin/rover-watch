<template>
    <div id="app">
        <div class="container">
            <div class="row d-flex justify-content-center">
                <main class="col-sm-10 pt-3">
                <Header></Header>
                <NavBar class="pt-5 main-nav" v-on:clicked="linkClicked"></NavBar>
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
@import './styles/normalize.css',
a {
    text-decoration: none;
}
</style>
<style>
@import './styles/main.css'
</style>
