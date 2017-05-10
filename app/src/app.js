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

function requireAuth(to, from, next) {
    firebase.auth().onAuthStateChanged(function(user) {
        var userObject = firebase.auth().currentUser;
        if (userObject) {
            localStorage.mapUid = userObject.uid;
            window.scrollTo(0, 0);
            next();
        } else {
            next(false);
            localStorage.clear();
            window.location.assign("/login");
        }
    });
}

const router = new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [
        {
            path: "/",
            component: Maps,
            beforeEnter: requireAuth
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/map",
            component: Maps,
            beforeEnter: requireAuth
        }
    ]
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount("#app");
