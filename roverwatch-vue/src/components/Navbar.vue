<template>

<nav class="main-nav text-center">
    <ul>
        <li><router-link to="/">Home</router-link><span>|</span></li>
        <li><router-link to="/rovercams">View Rover Cams</router-link><span>|</span></li>
        <li><router-link to="/info">Info</router-link><span>|</span></li> 
        <li><router-link to="/contact">Contact</router-link></li>
    </ul>
</nav> 


</template>
<script>
export default {
    name : "NavBar"
}
</script>
