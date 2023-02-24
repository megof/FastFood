import nav from "./nav.js";
import dataMenu from './dataMenu.js'
const { createApp } = Vue;

createApp({
    data() {
        return {
          dataMenu:[], //Productos que ofrece la tienda
          numberOfUnits:1, //Cantidad de unidades del producto a pedir.
          modalInformation:{}, //Información que se muestra en el modal de confirmar el pedido.
          currentOrder:{}, //Esta es la orden actual, una de las tantas que se mostrará en el carrito de compras.
          ordersPlaced:[], //EStas son las ordenes que posteriormente se muestran en el carrito de compras
        }
    },
    methods: {
      increaseUnits(e){
        //Este es el id que traigo de mi botón.
        let id=Number(e.target.dataset.id)
        //Este es el arreglo que debo modificar y su índice
        let food=this.dataMenu.find(el=>el.id===id)
        let index=this.dataMenu.map(el=>el.id).indexOf(id)
        
         food.units+=1
         this.dataMenu[index]=food
         //Actualizo para el que se muestre en el modal el número que colocó el usuario.
         this.numberOfUnits=food.units
    },
    decreaseUnits(e){
       //Este es el id que traigo de mi botón.
       let id=Number(e.target.dataset.id)
       //Este es el arreglo que debo modificar y su índice
       let food=this.dataMenu.find(el=>el.id===id)
       let index=this.dataMenu.map(el=>el.id).indexOf(id)
       if(food.units===1) return
        food.units-=1
        this.dataMenu[index]=food
        //Para el modal
        this.numberOfUnits=food.units
    },
    decreaseUnitsModal(){
      if(this.numberOfUnits===1) return
      this.numberOfUnits-=1
    },
    increaseUnitsModal(){
      this.numberOfUnits+=1
    },
    deployModal(e){
        //Actualizo la info que se muestra en el modal de confirmar el pedido
        this.numberOfUnits=this.dataMenu.find(el=>el.id===Number(e.target.id)).units
        this.modalInformation=this.dataMenu.find(el=>el.id===Number(e.target.id)) 
       
    },
    closeModal(){
        const myModalEl = document.getElementById('exampleModal');
        const modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide()
    },
    confirmOrder(){
       
        this.currentOrder={
            img:this.modalInformation.image,
            units:this.numberOfUnits,
            name:this.modalInformation.name,
            price:this.modalInformation.price,
            priceTotal:this.modalInformation.price*this.numberOfUnits
        }
        this.ordersPlaced.push(this.currentOrder)
        localStorage.setItem("orders",JSON.stringify(this.ordersPlaced))
        this.closeModal()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su pedido ha sido realizado, por favor diríjase al carrito de compras para confirmar la compra.',
            showConfirmButton: true,
          })
        
    }

    },
    beforeMount(){
        //Localstorage de los productos que tenemos para ofrecer.
        if(localStorage.getItem("food")){
            this.dataMenu=JSON.parse(localStorage.getItem("food"))
            
        }else{
            this.dataMenu=dataMenu
            localStorage.setItem("food",JSON.stringify(this.dataMenu))
        }
       
        //Localstorage de las ordenes que van para el carrito.
        if(localStorage.getItem("orders")){
            this.ordersPlaced=JSON.parse(localStorage.getItem("orders"))
        }
    },
    mounted() {
        
    },
    created() { 
        
              
    },
}).mount("#root");
