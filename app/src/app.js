import "./../../node_modules/sweetalert/dist/sweetalert.css";
import "./style/app.scss";

import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import swal from "sweetalert";

import App from "./App.vue";
import Maps from "./pages/map.vue";
import Login from "./pages/login.vue";

Vue.use(axios);
Vue.use(VueRouter);
Vue.use(swal);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA6u7ZXS40RzHa3ySS99ppfDHe5-RSRFbg",
    authDomain: "kyushu-playground.firebaseapp.com",
    databaseURL: "https://kyushu-playground.firebaseio.com",
    projectId: "kyushu-playground",
    storageBucket: "kyushu-playground.appspot.com",
    messagingSenderId: "412403945891"
};
firebase.initializeApp(config);

const router = new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [
        {
            path: "/",
            component: Maps
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/map",
            component: Maps
        }
    ]
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount("#app");
