const app = Vue.createApp({
  data () {
    return {
      workers: [
        {
          name: 'Carlos Perez',
          state: 'Disponible'
        },
        {
          name: 'Martha Suarez',
          state: 'Disponible'
        },
        {
          name: 'Pedro Hernandez',
          state: 'Disponible'
        },
        {
          name: 'Lorena Velandia',
          state: 'Disponible'
        },
        {
          name: 'Andrés Murcia',
          state: 'Disponible'
        }
      ],
      orders: [
        {
          id: 120,
          item: 'hambuegesa 1',
          quantity: 2,
          state: 'Pendiente'
        },
        {
          id: 121,
          item: 'perro 2',
          quantity: 1,
          state: 'Pendiente'
        },
        {
          id: 122,
          item: 'hambuegesa criolla 3',
          quantity: 1,
          state: 'Pendiente'
        },
        {
          id: 123,
          item: 'hambuegesa 4',
          quantity: 2,
          state: 'Pendiente'
        },
        {
          id: 124,
          item: 'perro 5',
          quantity: 1,
          state: 'Pendiente'
        },
        {
          id: 125,
          item: 'hambuegesa criolla 6',
          quantity: 1,
          state: 'Pendiente'
        }
      ],
      orderToChange: null,
      timeouts: [],
      ordersTimeout: []
    }
  },
  methods: {
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
      this.orderToChange.state = 'En entrega'
      worker.state = 'Despachando'
      Object.assign(this.orders, this.orderToChange)
      Object.assign(this.workers, worker)
      localStorage.setItem('orders', JSON.stringify(this.orders))
      localStorage.setItem('workers', JSON.stringify(this.workers))
      alert('Entrega asiganada exitosamente al domiciliario')
      this.countDeliveryTime(worker)
    },
    countDeliveryTime (worker) {
      this.ordersTimeout.push(this.orderToChange)
      let timeout = setTimeout(() => {
        console.log('en timeout')
        worker.state = 'Disponible'
        Object.assign(this.workers, worker)
        this.ordersTimeout[0].state = 'Entregado'
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

      if (orderToCook.state === 'Pendiente') {
        orderToCook.state = 'En preparación'
        Object.assign(this.orders, orderToCook)
        localStorage.setItem('orders', JSON.stringify(this.orders))
        console.log('order to cook', orderToCook)
      } else if(orderToCook.state === 'En preparación'){
        alert('Al parecer has finalizado la preparación de este pedido. Enviar a domicilios?')
        orderToCook.state = 'Listo para entrega'
        Object.assign(this.orders, orderToCook)
        localStorage.setItem('orders', JSON.stringify(this.orders))
        console.log('order to cook', orderToCook)
      }
    }
  },
  created () {
    this.syncLocalStorage()
    console.log('TIMEOUTSinicio', this.timeouts)
  }
})

app.mount('#app')
