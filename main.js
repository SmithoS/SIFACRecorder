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
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    router
}).$mount('#wrapper');
