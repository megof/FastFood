const { createApp } = Vue
import navBar from './nav.js'

createApp({
  data() {
    return {
      dataMenu: [], //Productos que ofrece la tienda
      numberOfUnits: 1, //Cantidad de unidades del producto a pedir.
      modalInformation: {}, //Información que se muestra en el modal de confirmar el pedido.
      currentOrder: {}, //Esta es la orden actual, una de las tantas que se mostrará en el carrito de compras.
      ordersPlaced: [], //EStas son las ordenes que posteriormente se muestran en el carrito de compras
      ordersToPay: [],
      currentTotal: null,
      orders: [],

      // Login - Jasser
      users: [
        { name: "camila", password: 1234 },
        { name: "camilo", password: 5678 },
        { name: "jasser", password: 9012 },
      ],

      is: {
        logout: true,
        login: false,
      },

      user: {
        name: "",
        password: "",
      },
      // FIN Login - Jasser
    };
  },
  methods: {
    // Login -Jasser
    isLogin() {
      if (
        this.users.some(
          (user) => user.name.toLowerCase() === this.user.name.toLowerCase() && user.password === parseInt(this.user.password)
        )
      ) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Usuario Validado Correctamente",
        });

        this.is = {
          logout: false,
          login: true,
        };

        sessionStorage.setItem("user", JSON.stringify(this.user));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario o contraseña incorrectos",
        });
        return false;
      }
    },
    // FIN Login -Jasser

    increaseUnits(e) {
      //Este es el id que traigo de mi botón.
      let id = Number(e.target.dataset.id)
      //Este es el arreglo que debo modificar y su índice
      let food = this.dataMenu.find(el => el.id === id)
      let index = this.dataMenu.map(el => el.id).indexOf(id)

      food.units += 1
      this.dataMenu[index] = food
      //Actualizo para el que se muestre en el modal el número que colocó el usuario.
      this.numberOfUnits = food.units
    },
    decreaseUnits(e) {
      //Este es el id que traigo de mi botón.
      let id = Number(e.target.dataset.id)
      //Este es el arreglo que debo modificar y su índice
      let food = this.dataMenu.find(el => el.id === id)
      let index = this.dataMenu.map(el => el.id).indexOf(id)
      if (food.units === 1) return
      food.units -= 1
      this.dataMenu[index] = food
      //Para el modal
      this.numberOfUnits = food.units
    },
    decreaseUnitsModal() {
      if (this.numberOfUnits === 1) return
      this.numberOfUnits -= 1
    },
    increaseUnitsModal() {
      this.numberOfUnits += 1
    },
    deployModal(e) {
      //Actualizo la info que se muestra en el modal de confirmar el pedido
      this.numberOfUnits = this.dataMenu.find(
        el => el.id === Number(e.target.id)
      ).units
      this.modalInformation = this.dataMenu.find(
        el => el.id === Number(e.target.id)
      )
    },
    closeModal() {
      const myModalEl = document.getElementById('exampleModal')
      const modal = bootstrap.Modal.getInstance(myModalEl)
      modal.hide()
    },
    confirmOrder() {
      this.currentOrder = {
        id: Math.round(Math.random() * 500),
        idProduct: this.modalInformation.id,
        img: this.modalInformation.image,
        amount: this.numberOfUnits,
        name: this.modalInformation.name,
        price: this.modalInformation.price,
        priceTotal: this.modalInformation.price * this.numberOfUnits
      }
      this.ordersPlaced.push(this.currentOrder)
      this.currentOrder = {}

      this.currentTotal = this.ordersPlaced.reduce(
        (acc, cur) => acc + cur.priceTotal,
        0
      )
      localStorage.setItem('ordersPlaced', JSON.stringify(this.ordersPlaced))
      this.closeModal()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title:
          'Su pedido ha sido realizado, por favor diríjase al carrito de compras para confirmar la compra.',
        showConfirmButton: true
      })
    },

    createNewOrderToPay() {
      const totalToPay = this.ordersPlaced.reduce(
        (acc, cur) => acc + cur.priceTotal,
        0
      )
      this.orders.push({
        id: Math.round(Math.random() * 500),
        items: this.ordersPlaced,
        state: 'Pagado',
        total: totalToPay
      })
      localStorage.setItem('orders', JSON.stringify(this.orders))
      this.ordersPlaced = []
      localStorage.setItem('ordersPlaced', JSON.stringify(this.ordersPlaced))
      Swal.fire({
        icon: "success",
        title: "Pagado",
        text: "Muchas gracias por preferir nuestro servicio!",
      });
      const myModalEl = document.getElementById('paymodal')
      const modal = bootstrap.Modal.getInstance(myModalEl)
      modal.hide()

    },
    deleteOrderItem(id) {
      this.ordersPlaced = this.ordersPlaced.filter(order => {
        return order.id !== id
      })
      this.currentTotal = this.ordersPlaced.reduce(
        (acc, cur) => acc + cur.priceTotal,
        0
      )
      localStorage.setItem('ordersPlaced', JSON.stringify(this.ordersPlaced))
    },
    deleteAllOrders() {
      this.ordersPlaced = []
      localStorage.setItem('ordersPlaced', JSON.stringify(this.ordersPlaced))
    },
    goToAdmin() {
      window.open('../administrator.html', '_self')
    },
    goToChef() {

      console.log("leng", this.orders.length)
      localStorage.setItem('len', JSON.stringify(this.orders.length))
      if (this.orders.length > 0) {
        window.open('../chef.html', '_self')
      } else {
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "Parece que no se han realizado pedidos hoy!",
        });
      }

    },
    goToWaiter() {
      console.log("leng", this.orders.length)
      if (this.orders.length > 0) {
        window.open('../waiter.html', '_self')
      }
      else {
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "Parece que no se han realizado pedidos hoy!",
        });
      }
    }
  },
  beforeMount() {
    //Localstorage de los productos que tenemos para ofrecer.
    if (localStorage.getItem('food')) {
      this.dataMenu = JSON.parse(localStorage.getItem('food'))
    } else {
      this.dataMenu = dataMenu
      localStorage.setItem('food', JSON.stringify(this.dataMenu))
    }

    //Localstorage de las ordenes que van para el carrito.
    if (localStorage.getItem('ordersPlaced')) {
      this.ordersPlaced = JSON.parse(localStorage.getItem('ordersPlaced'))
    }

    if (localStorage.getItem('orders')) {
      this.orders = JSON.parse(localStorage.getItem('orders'))
    }
  },
  mounted() {
    navBar()
    this.currentTotal = this.ordersPlaced.reduce(
      (acc, cur) => acc + cur.priceTotal,
      0
    )
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null) {
      this.user = user;
      if (this.user) {
        this.is = {
          logout: false,
          login: true,
        };
      } else {
        this.is = {
          logout: true,
          login: false,
        };
      }
    }
  },

  computed: {
    //Esta propieda computada devuelve una clase que ya habia definido css y se activa unicamente cuando el carrito de compras cambia.
    onAnimation() {
      return this.ordersPlaced.length > 0 ? "shopping-active" : "shopping";
    },
  },
}).mount("#root");
