import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/components/Index';
import AddRecipe from '@/components/AddRecipe';

Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/add',
            name: 'AddRecipe',
            component: AddRecipe
        }
    ]
});
