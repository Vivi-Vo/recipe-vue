<template>
  <v-app id="home">
    <v-container>
      <v-row dense>
        <v-col justify="center" alignment="center" cols="12">
          <h1 id="greeting">Hi there!</h1>
          <h2 id="header">WHAT'S IN YOUR FRIDGE?</h2>

          <v-form
            id="ingredientForm"
            class="form-group"
            v-for="(item, index) in ingredients"
            :key="index"
          >
            <v-text-field label="Ingredient" v-model="ingredients[index]" />
          </v-form>

          <div class="btn-group">
            <v-btn class="mx-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
            <v-btn v-on:click="fetchRecipe" class="btn btn-primary" id="showRecipe">SHOW RECIPES</v-btn>
          </div>
        </v-col>
      </v-row>

      <recipeCard v-bind:dishes="dishes"></recipeCard>

      <v-btn large absolute bottom left icon @click="scrollToTop">
        <v-icon>mdi-arrow-up-circle</v-icon>
      </v-btn>

      <v-btn large absolute bottom right icon v-on:click="setTheme">
        <v-icon dark>mdi-brightness-6</v-icon>
      </v-btn>
    </v-container>
  </v-app>
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
      }&number=6`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.dishes = result;
        });
    },
    setTheme: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=League+Script&display=swap");

.btn-group {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
#home {
  color: rgb(46, 44, 44);
  font-family: roboto;
  min-height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#showRecipe {
  background-color: salmon;
  margin-top: 10px;
  padding: 10px;
}
h2 {
  text-align: center;
  font-family: "Anton", sans-serif;
  font-style: normal;
  font-stretch: ultra-condensed;
}
h1 {
  font-family: "League Script", cursive;
  text-align: center;
}
</style>