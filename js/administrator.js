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
            category: "",
            image: "",
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
        },
        // go to orders info
        goToOrdersInfo() {
            // Set render
            this.render.options = false;
            this.render.ordersInfo = true;
        },
        // Set order details
        setOrderDetails(order) {
            // Set order info
            this.order = order;
            // Set order product details
            for (let i = 0; i < this.order.products.length; i++) {
                // Get product
                const productInfo = this.food.find(food => food.id == this.order.products[i].id);
                // Set product info
                this.order.products[i] = {
                    total: this.order.products[i].amount * productInfo.price,
                    ...this.order.products[i],
                    ...productInfo,
                };
            }
            // log order
            console.log(this.order);
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
            if (this.name === "" || this.shortDescription === "" || this.longDescription === "" || this.price === "" || this.category === "") {
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