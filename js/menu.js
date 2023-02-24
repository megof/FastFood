const { createApp } = Vue;
import dataMenu from './dataMenu.js'
createApp({
    data() {
        return {
            dataMenu:[], //Productos que ofrece la tienda
            numberOfUnits:0, //Cantidad de unidades del producto a pedir.
            modalInformation:{}, //Información que se muestra en el modal de confirmar el pedido.
            currentOrder:{}, //Esta es la orden actual, una de las tantas que se mostrará en el carrito de compras.
            ordersPlaced:[], //EStas son las ordenes que posteriormente se muestran en el carrito de compras
        }
    },
    methods: {
        increaseUnits(){
            this.numberOfUnits+=1
        },
        decreaseUnits(){
            if(this.numberOfUnits===0) return
            this.numberOfUnits-=1
        },
        deployModal(e){
            //Actualizo la info que se muestra en el modal de confirmar el pedido
            this.modalInformation=this.dataMenu.find(el=>el.id===Number(e.target.id))  
        },
        confirmOrder(){
            alert("Estamos confirmando el pedido :v")
        }

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