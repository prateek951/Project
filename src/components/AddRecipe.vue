<template>
    <div class="add-recipe container">
        <h2 class="center-align indigo-text">Add New Recipe</h2>
        <form @submit.prevent="onAddRecipe()">
            <div class="field title">
                <label for="title">Recipe Title</label>
                <input type="text" name="title" placeholder="Recipe title"
                v-model="title">
            </div>
            <div v-for="(ingredient,index) in ingredients" :key="index">
                <label for="ingredient">Ingredient</label>
                <input type="text" name="ingredient" v-model="ingredients[index]"/>
            </div>
            <div class="field add">
                <label for="add">Add an ingredient</label>
                <input type="text" name="add" 
                placeholder="Recipe ingredients"
                @keydown.tab.prevent="addIngredient()" v-model="anotherIngredient">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn green">Add Recipe</button>
            </div>
        </form>
    </div>
    
</template>


<script>
import db from '@/utils/fb';
import slugify from 'slugify';

export default {
        name : 'AddRecipe',
        data() {
            return {
                title : null,
                anotherIngredient: null,
                ingredients: [],
                feedback : null,
                slug: null
            }
        },
        methods: {
            async onAddRecipe(){
                console.log(this.title);
                console.log(this.ingredients);
                if(this.title){
                    this.feedback = null;
                    //create a slug
                    this.slug = slugify(this.title,{
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    });
                    // console.log(this.slug);
                  const result =  await db.collection('recipes').add({
                        title: this.title,
                        slug: this.slug,
                        ingredients : this.ingredients
                    });
                    result.then(() => this.$router.push({name: 'Index'})).catch(err => console.log(err));
                }else{
                    this.feedback = 'You must enter a title for the recipe';
                }

            },
            addIngredient(){
                if(this.anotherIngredient){
                    this.ingredients.push(this.anotherIngredient);
                    console.log(this.ingredients);
                    this.anotherIngredient = null;
                    this.feedback = null;
                }
                else{
                    this.feedback = 'You must enter a value to add an ingredient';
                }
            }
        }
    }
</script>


<style scoped>
.add {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-recipe h2 {
    font-size: 2em;
    margin : 20px auto;
}
.add-recipe .field {
    margin: 20px auto;
}
</style>
