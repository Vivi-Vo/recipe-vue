<template>
  <div>
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
    <v-btn class="btn btn-secondary" @click="showModal=true">+</v-btn>
    <p class="text-center">Add More</p>

    <v-btn v-on:click="fetchRecipe" class="btn btn-primary" id="showRecipe">SHOW RECIPES</v-btn>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      api_key: "8056c060793247a1a67cd935a4434d5f",
      url_base: "https://api.spoonacular.com/recipes",
      ingredients: ["", "", ""],
      username: "Vivi",
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