<template>
    <div>
        {content}
    </div>
</template>
<script>
export default {
    name: "MainContent",
    data(){
        return {
            content: setContent() 
        }
    },
    methods: {
        setContent: (toShow)=> {
            switch (toShow){
                case 'home' : 
                return "test home"
            }
        }
    }
}
</script>
<style>
    
</style>
