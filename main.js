Vue.mixin(logic_database);

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
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    router
}).$mount('#wrapper');
