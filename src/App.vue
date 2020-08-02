<template>
  <v-app id="app">
    <home></home>
    <!-- Recipes component -->
    <div v-for="dish in dishes" :key="dish.id">
      <img :src="dish.image" @click="showModal=true" />
      <p>{{dish.title}}</p>
    </div>
    <!-- Modal component -->
    <recipeCard id="recipe" v-if="showModal" @close="showModal= false"></recipeCard>
  </v-app>
</template>

<script>
import recipeCard from "./components/RecipeCard.vue";
import home from "./components/Home"
export default {
  name: "app",
  components: {
    home, recipeCard
  },
  data() {
    return {
      api_key: "8056c060793247a1a67cd935a4434d5f",
      url_base: "https://api.spoonacular.com/recipes",
      ingredients: ["", "", ""],
      username: "Vivi",
      dishes: [],
      instructions: [],
      showModal: false
    };
  },
  methods: {
    fetchRecipe: function() {
      const url = `${
        this.url_base
      }/findByIngredients?ingredients=${this.ingredients.join(",")}&apiKey=${
        this.api_key
      }&number=4`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.dishes = result;
        });
    },
    getInstruction: function(id) {
      const url = `${this.url_base}/${id}/analyzedInstructions?&apiKey=${this.api_key}&stepBreakdown=true`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.instructions = result[0].steps;
        });
    },
    getRecipeIngredients: function(id) {
      const url = `${this.url_base}/${id}/ingredientWidget.json?apiKey=${this.api_key}`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.instructions = result[0].steps;
        });
    }
  }
};
</script>

<style>
#app {
  color: gray;
  font-family: monospace;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
}
h1 {
  text-align: center;
}
#showRecipe {
  background-color: salmon;
}

</style>