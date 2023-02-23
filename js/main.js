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
          item: 'hambuegesa',
          quantity: 2,
          state: 'Listo para entrega'
        },
        {
          id: 121,
          item: 'perro',
          quantity: 1,
          state: 'Listo para entrega'
        },
        {
          id: 122,
          item: 'hambuegesa criolla',
          quantity: 1,
          state: 'Listo para entrega'
        }
      ],
      orderToChange: null
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
      console.log('worker', worker)

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
      console.log('Worker', worker)
      setTimeout(() => {
        worker.state = 'Disponible'
        Object.assign(this.workers, worker)
        this.orderToChange.state = 'Entregado'
        Object.assign(this.orders, this.orderToChange)
        localStorage.setItem('orders', JSON.stringify(this.orders))
        localStorage.setItem('workers', JSON.stringify(this.workers))
      }, 3000)
    },
    dispatch (id) {
      console.log('id', id)
      this.orderToChange = this.orders.find(order => {
        return order.id === id
      })

      console.log('orderToChange', this.orderToChange)
    }
  },
  created () {
    this.syncLocalStorage()
  }
})

app.mount('#app')
