const { createApp } = Vue;
import dataMenu from './dataMenu.js'
createApp({
    data() {
        return {
            dataMenu:[],
            numberOfUnits:0,
        }
    },
    methods: {
    },
    beforeMount(){
        
        if(localStorage.getItem("food")){
            this.dataMenu=JSON.parse(localStorage.getItem("food"))
        }else{
            this.dataMenu=dataMenu
            localStorage.setItem("food",JSON.stringify(this.dataMenu))
        }
    },
    mounted() {
        
    },
    created() { 
        
              
    },
}).mount("#root");