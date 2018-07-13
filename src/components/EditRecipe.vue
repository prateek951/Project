<template>
    <div v-if="recipe" class="edit-recipe container">
        <h2>Edit {{recipe.title}} Recipe</h2>
        <form @submit.prevent="onEditRecipe()">
            <div class="field title">
                <label for="title">Recipe Title</label>
                <input type="text" name="title" v-model="recipe.title"/>
            </div>    
            <div v-for="(ingredient,index) in recipe.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient</label>
                <input type="text" name="ingredient" v-model="recipe.ingredients[index]"/>
                <i class="class material-icons delete" @click="onDeleteIngredient(ingredient)">delete</i>
            </div>
            <div class="field add">
                <label for="add">Add an Ingredient</label>
                <input type="text" name="add" @keydown.tab.prevent="onAddIngredient()" v-model="anotherIngredient"/>
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Recipe</button>
            </div>
        </form>     
    </div>
</template>


<script>
import db from '@/utils/fb';
import slugify from 'slugify';

export default {
    name: 'EditRecipe',
    data() {
        return{
            recipe: null,
            anotherIngredient: null,
            feedback: null
        }
    },
    methods: {
        onAddIngredient(){
            if(this.anotherIngredient){
                this.recipe.ingredients.push(this.anotherIngredient);
                this.feedback = null;
                this.anotherIngredient = null;
            }else{
                this.feedback = 'You must enter a value to add an ingredient';
            }
        },
        onDeleteIngredient(ing){
            this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => ingredient !== ing);

        },
        onEditRecipe(){
         if(this.recipe.title){
             this.feedback = null;
              //create a slug
            this.recipe.slug = slugify(this.recipe.title,{
                replacement: '-',
                remove: /[$*_+~.()'"!\-:@]/g,
                lower: true
            });
            db.collection('recipes').doc(this.recipe.id).update({
                title: this.recipe.title,
                slug: this.recipe.slug,
                ingredients : this.recipe.ingredients
            }).then(() => this.$router.push({name: 'Index'}))
            .catch(err => console.log(err));
         }else{
             this.feedback = 'You must enter a recipe title';
         }
        }
    },
    async created(){
        let ref = db.collection('recipes').where('slug','==', this.$route.params.recipe_slug);
        const pr = await ref.get();
        const snapshot = await pr;
        // console.log(snapshot);
        // snapshot.forEach(doc => console.log(doc.data()));
        snapshot.forEach(doc => {
            this.recipe = doc.data();
            this.recipe.id = doc.id;
        });
    }
}
</script>


<style>
.edit {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-recipe h2 {
    font-size: 2em;
    margin : 20px auto;
}
.edit-recipe .field {
    margin: 20px auto;
    position: relative;
}
.edit-recipe .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>

