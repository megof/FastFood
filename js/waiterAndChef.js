const app = Vue.createApp({
  data () {
    return {
      // Order info
      order: {},
      workers: dataWorkers,
      orders: dataOrders,
      orderToChange: null,
      timeouts: [],
      ordersTimeout: []
    }
  },
  methods: {
    // Set order details
    setOrderDetails(order) {
      // Set order product details
      this.setProductDetailsAtOrder(order);
    },
    // Set product details at order
    setProductDetailsAtOrder(order) {
        for (let i = 0; i < order.products.length; i++) {
            // Get product
            const productInfo = this.food.find(food => food.id == order.products[i].id);
            // Set product info
            order.products[i] = {
                total: order.products[i].amount * productInfo.price,
                ...order.products[i],
                ...productInfo,
            };
            // Log product info
            console.log(order.products[i]);
        }

    },
    // Get products from local storage
    getFoodFromLocalStorage() {
      // Get food
      const food = JSON.parse(localStorage.getItem("food"));
      // Check if food exist
      if (food) {
          // Set food
          this.food = food;
      }
      else {
          // Set food
          this.food = dataMenu;
          // Save food at local storage
          this.saveFoodAtLocalStorage();
      }
  },
  // Save food at local storage
  saveFoodAtLocalStorage() {
      // Save food
      localStorage.setItem("food", JSON.stringify(this.food));
  },
    syncLocalStorage () {
      if (
        localStorage.getItem('workers') === null ||
        localStorage.getItem('workers') === undefined ||
        localStorage.getItem('orders') === null ||
        localStorage.getItem('orders') === undefined
      ) {
        localStorage.setItem('workers', JSON.stringify(this.workers))
        localStorage.setItem('orders', JSON.stringify(this.orders))
      } else {
        localStorage.setItem('workers', localStorage.getItem('workers'))
        const toUpdateworkers = JSON.parse(localStorage.getItem('workers'))
        this.workers = toUpdateworkers

        localStorage.setItem('orders', localStorage.getItem('orders'))
        const toUpdateOrders = JSON.parse(localStorage.getItem('orders'))
        this.orders = toUpdateOrders
      }
    },
    changeOrderStatus (worker) {
      this.orderToChange.status = 'En entrega'
      worker.status = 'Despachando'
      Object.assign(this.orders, this.orderToChange)
      Object.assign(this.workers, worker)
      localStorage.setItem('orders', JSON.stringify(this.orders))
      localStorage.setItem('workers', JSON.stringify(this.workers))
      alert('Entrega asignada exitosamente al domiciliario')
      this.countDeliveryTime(worker)
    },
    countDeliveryTime (worker) {
      this.ordersTimeout.push(this.orderToChange)
      let timeout = setTimeout(() => {
        console.log('en timeout')
        worker.status = 'Disponible'
        Object.assign(this.workers, worker)
        this.ordersTimeout[0].status = 'Entregada'
        Object.assign(this.orders, this.ordersTimeout[0])
        localStorage.setItem('orders', JSON.stringify(this.orders))
        localStorage.setItem('workers', JSON.stringify(this.workers))
        this.timeouts.splice(this.timeouts.indexOf(timeout), 1)
        this.ordersTimeout.shift()
      }, 5000)
      this.timeouts.push(timeout)
    },
    dispatch (id) {
      this.orderToChange = this.orders.find(order => {
        return order.id === id
      })
    },
    cookOrder (id) {
      const orderToCook = this.orders.find(order => {
        return order.id === id
      })

      if (orderToCook.status === 'Pendiente') {
        orderToCook.status = 'En preparación'
        Object.assign(this.orders, orderToCook)
        localStorage.setItem('orders', JSON.stringify(this.orders))
        console.log('order to cook', orderToCook)
      } else if(orderToCook.status === 'En preparación'){
        alert('Al parecer has finalizado la preparación de este pedido. Enviar a domicilios?')
        orderToCook.status = 'Listo para entrega'
        Object.assign(this.orders, orderToCook)
        localStorage.setItem('orders', JSON.stringify(this.orders))
        console.log('order to cook', orderToCook)
      }
    }
  },
  created () {
    this.syncLocalStorage()
    console.log('TIMEOUTSinicio', this.timeouts)
  },
  mounted () {
    // Get products from local storage
    this.getFoodFromLocalStorage();
  }
})

app.mount('#app')
