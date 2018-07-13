<template>
        <div class="index container">
            <div class="card" v-for="recipe in recipes" :key="recipe.id">
                <div class="card-content">
                    <i class="material-icons delete" @click="onDeleteRecipe(recipe.id)">delete</i>
                    <h2 class="indigo-text">{{ recipe.title }}</h2>
                    <ul class="ingredients">
                        <li v-for="(ingredient,index) in recipe.ingredients" :key="index">
                            <span class="chip">{{ ingredient }}</span>
                        </li>
                    </ul>
                </div>
                <span class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{name: 'EditRecipe',params: {recipe_slug: recipe.slug}}">
                        <i class="material-icons">edit</i>
                    </router-link>
                </span>
            </div>
        </div>
</template>


<script>
    import db from '@/utils/fb';
    /*eslint-disable*/
    export default {
        name: 'Index',
        data() {
            return {
                recipes: []
            }
        },
        methods: {
            async onDeleteRecipe(id){
                // console.log('inside the onDelete recipe');
                // this.recipes = this.recipes.filter(recipe => recipe.id !== id);
                // console.log(`after deleting one of the recipes... ${this.recipes}`);
            // console.log(id);
            await db.collection('recipes').doc(id).delete();
            this.recipes = this.recipes.filter(recipe => recipe.id !== id);
            console.log('What are recipes now?',this.recipes);

         }
        },
        async created(){
            //fetch data from the firestore
            console.log('inside the created lifecycle hook...');
            const snapshot = await db.collection('recipes').get();
            snapshot.forEach(doc => {
                // console.log(doc.data(),doc.id);
                let recipe = doc.data();
                recipe.id = doc.id;
                this.recipes.push(recipe);
            });
            // console.log(this.recipes);
        }
    }
</script>

<style>
    .index {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
        margin-top: 60px;
    }
    .index h2{
        font-size: 1.8em;
        text-align: center;
        margin-top: 0;
    }
    .index .ingredients{
        margin: 30px auto;
    }
    .index .ingredients li {
        display: inline-block;
    }
    .index .delete{
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #aaa;
        font-size: 1.4em;
    }
</style>
