<template>
  <v-container>
    <h1 id="greeting">Hi {{username}}!</h1>
    <h2 id="header">What's in your fridge?</h2>

    <v-form
      id="ingredientForm"
      class="form-group"
      v-for="(item, index) in ingredients"
      :key="index"
    >
      <v-text-field label="Ingredient" v-model="ingredients[index]" />
    </v-form>

    <v-btn class="mx-2" fab dark color="indigo">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <v-btn v-on:click="fetchRecipe" class="btn btn-primary" id="showRecipe">SHOW RECIPES</v-btn>
    <recipeCard v-bind:dishes="dishes"></recipeCard>
  </v-container>
</template>

<script>
import recipeCard from "./RecipeCard.vue";
export default {
  name: "home",
  components: {
    recipeCard
  },
  props: {
    username: String
  },
  data() {
    return {
      api_key: process.env.VUE_APP_API_KEY,
      url_base: "https://api.spoonacular.com/recipes",
      ingredients: ["", "", ""],
      dishes: []
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
    }
  }
};
</script>

<style>
</style>