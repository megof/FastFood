const app = Vue.createApp({
  data () {
    return {
      // Order info
      order: {},
      workers: dataWorkers,
      orders: [],
      orderToChange: null,
      timeouts: [],
      ordersTimeout: []
    }
  },
  methods: {
    // Set order details
    setOrderDetails () {
      // Set order product details
      for(let i = 0; i < this.orders.length; i++){
        this.setProductDetailsAtOrder(this.orders[i]);
      }
    },
    // Set product details at order
    setProductDetailsAtOrder (order) {
      for (let i = 0; i < order.items.length; i++) {
        // Get product
        const productInfo = this.food.find(
          food => food.id == order.items[i].idProduct
        )
        // Set product info
        order.items[i] = {
          total: order.items[i].amount * productInfo.price,
          ...order.items[i],
          ...productInfo
        }
      }
    },
    // Get products from local storage
    getFoodFromLocalStorage () {
      // Get food
      const food = JSON.parse(localStorage.getItem('food'))
      // Check if food exist
      if (food) {
        // Set food
        this.food = food
      } else {
        // Set food
        this.food = dataMenu
        // Save food at local storage
        this.saveFoodAtLocalStorage()
      }
    },
    // Save food at local storage
    saveFoodAtLocalStorage () {
      // Save food
      localStorage.setItem('food', JSON.stringify(this.food))
    },
    syncLocalStorage () {
      console.log(localStorage.getItem('orders').length)

      if (
        localStorage.getItem('workers') === null ||
        localStorage.getItem('workers') === undefined
      ) {
        console.log(' es null')
        localStorage.setItem('workers', JSON.stringify(this.workers))
        //localStorage.setItem('orders', JSON.stringify(this.orders))
      } else {
        localStorage.setItem('workers', localStorage.getItem('workers'))
        const toUpdateworkers = JSON.parse(localStorage.getItem('workers'))
        this.workers = toUpdateworkers

        localStorage.setItem('orders', localStorage.getItem('orders'))
        const toUpdateOrders = JSON.parse(localStorage.getItem('orders'))
        this.orders = toUpdateOrders
      }

      if (
        localStorage.getItem('orders') === null ||
        localStorage.getItem('orders') === undefined
      ) {
        localStorage.setItem('orders', JSON.stringify(this.orders))
        //localStorage.setItem('orders', JSON.stringify(this.orders))
      } else {
        localStorage.setItem('orders', localStorage.getItem('orders'))
        const toUpdateOrders = JSON.parse(localStorage.getItem('orders'))
        this.orders = toUpdateOrders
      }
    },
    changeOrderStatus (worker) {
      this.orderToChange.state = 'En entrega'
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
        this.ordersTimeout[0].state = 'Entregada'
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

      if (orderToCook.state === 'Pagado') {
        orderToCook.state = 'En preparación'
        Object.assign(this.orders, orderToCook)
        localStorage.setItem('orders', JSON.stringify(this.orders))
        console.log('order to cook', orderToCook)
      } else if (orderToCook.state === 'En preparación') {
        alert(
          'Al parecer has finalizado la preparación de este pedido. Enviar a domicilios?'
        )
        orderToCook.state = 'Listo para entrega'
        Object.assign(this.orders, orderToCook)
        localStorage.setItem('orders', JSON.stringify(this.orders))
        console.log('order to cook', orderToCook)
      }
    },
    logout () {
      window.open('../index.html', '_self')
    }
  },
  created () {
    this.syncLocalStorage()
    console.log('OORDERS', this.orders)
  },
  mounted () {
    // Get products from local storage
    this.getFoodFromLocalStorage()
    // Set order details
    this.setOrderDetails()
  }
})

app.mount('#app')
