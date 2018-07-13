import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/components/Index';
import AddRecipe from '@/components/AddRecipe';
import EditRecipe from '@/components/EditRecipe';

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
        },
        {
            path: '/edit/:recipe_slug',
            name: 'EditRecipe',
            component: EditRecipe
        }
    ]
});
