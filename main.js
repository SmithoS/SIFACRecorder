Vue.mixin(logic_database);
Vue.mixin(logic_init);

const routes = [
    {
        path: "/",
        component: home
    },
    {
        path: "/home",
        name: 'home',
        component: home
    },
    {
        path: "/aim",
        name: 'aim',
        component: aim
    },
    {
        path: "/setting",
        name: 'setting',
        component: setting
    },
    {
        path: "/info",
        name: 'info',
        component: info
    },
    {
        path: "/err",
        name: 'err',
        component: err
    }
];

const router = new VueRouter({
    routes
});

Vue.config.errorHandler = (err, vm, info) => {
    ErrorArray.pushError(err)
    router.push("err")
}

new Vue({
    router
}).$mount('#wrapper');
