// Description: This file contains the javascript code for the administrator page
// Author: Sebastián Gámez Ariza

// Vue instance
const { createApp } = Vue;

// Create vue app
const app = createApp({
    // Variables
    data() {
        return {
            // Render
            render: {
                options: true,
                ordersInfo: false,
                ordersCompleted: false
            },
            // Order results
            orderResults: {
                completed: {
                    orders: 0,
                    total: 0,
                },
                canceled: {
                    orders: 0,
                    total: 0,
                },
                pending: {
                    orders: 0,
                    total: 0,
                }
            },
            // Order info
            order: {},
            // Orders
            orders: [],
            // Food
            food: [],
            // Inputs
            name: "",
            longDescription: "",
            shortDescription: "",
            price: "",
            units: "",
            category: "",
            image: ""
        }
    },
    // Mounted
    mounted() {
        // Get orders from local storage
        this.getOrdersFromLocalStorage();
        // Get products from local storage
        this.getFoodFromLocalStorage();
    },
    // Methods
    methods: {
        // Go to options
        goToAdminPanel(){
            // Set render
            this.render.options = true;
            this.render.ordersInfo = false;
            this.render.ordersCompleted = false;
        },
        // go to orders info
        goToOrdersInfo() {
            // Set render
            this.render.options = false;
            this.render.ordersInfo = true;
        },
        // go orders completed
        goToOrdersCompleted() {
            // Set order results
            this.setOrderResults();
            // Set render
            this.render.options = false;
            this.render.ordersCompleted = true;
        },
        // setOrderResults
        setOrderResults() {
            this.orders.map(order => {
                this.setProductDetailsAtOrder(order);
                if (order.status === "Entregada") {
                    this.orderResults.completed.orders++;
                    this.orderResults.completed.total += order.products.reduce((total, product) => total + product.total, 0);
                }
                else if (order.status === "Cancelada") {
                    this.orderResults.canceled.orders++;
                    this.orderResults.canceled.total += order.products.reduce((total, product) => total + product.total, 0);
                } else if (order.status === "Pendiente") {
                    this.orderResults.pending.orders++;
                    this.orderResults.pending.total += order.products.reduce((total, product) => total + product.total, 0);
                }
            });
        },
        // Set order details
        setOrderDetails(order) {
            // Set order info
            this.order = order;
            // Set order product details
            this.setProductDetailsAtOrder(this.order);
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
            }
            console.log(order);
        },
        // Get orders from local storage
        getOrdersFromLocalStorage() {
            // Get orders
            const orders = JSON.parse(localStorage.getItem("orders"));
            // Check if orders exist
            if (orders) {
                // Set orders
                this.orders = orders;
            } else {
                // Set orders
                this.orders = dataOrders;
                // Save orders at local storage
                this.saveOrdersAtLocalStorage();
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
        // Save orders at local storage
        saveOrdersAtLocalStorage() {
            // Save orders
            localStorage.setItem("orders", JSON.stringify(this.orders));
        },
        // Save food at local storage
        saveFoodAtLocalStorage() {
            // Save food
            localStorage.setItem("food", JSON.stringify(this.food));
        },
        // Create random id with 10 numbers
        createRandomId() {
            // Create random id
            let randomId = "";
            // Create random id
            for (let i = 0; i < 10; i++) {
                // Create random number
                const randomNumber = Math.floor(Math.random() * 10);
                // Add random number to random id
                randomId += randomNumber;
            }
            // Return random id
            return randomId;
        },
        // Define image
        defineImage() {
            // Check if image is empty
            if (this.image === "") {
                // Check if the image is a hot dog or a burger
                if (this.category === "hotDog") {
                    // Set image
                    this.image = "https://www.vvsupremo.com/wp-content/uploads/2016/02/900X570_Mexican-Style-Hot-Dogs.jpg";
                }
                else if (this.category === "burger") {
                    // Set image
                    this.image = "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/YHIW6C2CZBHIFGPLWQCFLXGDJI.jpg";
                }
            }
        },
        // Validate inputs
        validateInputs() {
            // Check if inputs are empty
            if (this.name === "" || this.shortDescription === "" || this.longDescription === "" || this.price == "" || this.units == "" || this.category === "") {
                // Show alert
                swal("Error", "Todos los campos son obligatorios", "error");
                // Return false
                return false;
            }
            // Return true
            return true;
        },
        // Clean form
        cleanForm() {
            // Clean inputs
            this.name = "";
            this.longDescription = "";
            this.shortDescription = "";
            this.price = "";
            this.units = "";
            this.category = "";
            this.image = "";
        },
        // Add new food
        addFood() {
            // Validate inputs
            if (this.validateInputs()) {
                // Define image
                this.defineImage();
                // Create new food
                const newFood = {
                    id: this.createRandomId(),
                    name: this.name,
                    longDescription: this.longDescription,
                    shortDescription: this.shortDescription,
                    price: this.price,
                    units: this.units,
                    category: this.category,
                    image: this.image,
                };
                // Push new food
                this.food.push(newFood);
                // Save food at local storage
                this.saveFoodAtLocalStorage();
                // Clean form
                this.cleanForm();
                // Show alert
                swal("Éxito", "Producto agregado correctamente", "success");
            }
        },
    }
});

// Mount app
app.mount("#app");