<template>
  <v-app id="home">
    <v-container >
      <v-row dense justify="center" alignment="center">
        <v-col cols="12">
          <h1 id="greeting" class="mb-n3">Hi there!</h1>
          <h2 id="headline">WHAT'S IN YOUR FRIDGE?</h2>

          <v-card class="elevation-12">
            <v-card-text>
              <v-form
                id="ingredientForm"
                class="form-group"
                v-for="(item, index) in ingredients"
                :key="index"
              >
                <v-text-field label="Ingredient" v-model="ingredients[index]" />
              </v-form>
            </v-card-text>

            <div class="btn-group">
              <v-btn class="mx-2" fab dark color="indigo">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>

              <v-card-actions>
                <v-btn v-on:click="fetchRecipe" class="btn btn-primary mb-4" id="showRecipe">SHOW RECIPES</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-btn small absolute top right icon v-on:click="setTheme">
        <v-icon dark>mdi-brightness-6</v-icon>
      </v-btn>

      <recipeCard v-bind:dishes="dishes"></recipeCard>
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
  display: flex;
  flex-direction: column;

  color: rgb(46, 44, 44);
  font-family: roboto;
}
#showRecipe {
  background-color: salmon;
  margin-top: 10px;
  padding: 10px;
}
#greeting {
  font-family: "League Script", cursive;
  text-align: center;
  font-size:xx-large;
}

#headline {
  text-align: center; 
  font-family: "Anton", sans-serif;
  font-style: normal;
  font-stretch: ultra-condensed;
  font-size:x-large;
  margin-top: 0;
  margin-bottom: 50px;
}

</style>