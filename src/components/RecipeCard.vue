<template>
  <v-row justify="center" alignment="center">
    <v-col v-for="dish in dishes" :key="dish.id" cols="6">
      <v-card>
        <div id="card" class="flex justify-space-between">
          <v-img
            class="align-self"
            :src="dish.image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            @click.stop="dialog=true;getRecipeIngredients(dish.id);selectedDish=dish"
          />
          <p class="title" v-text="dish.title"></p>
        </div>
      </v-card>
    </v-col>

    <v-dialog class="popup" v-model="dialog">
      <v-card>
        <v-card-title >
          <span class="headline">{{selectedDish.title}}</span>
        </v-card-title>

        <v-card-text>
          <span class="headline">Time Cook: {{timeCook}} minutes</span>
        </v-card-text>

        <v-btn class="btn mb-4" raised color="purple lighten-4">Ingredients</v-btn>
        <v-spacer></v-spacer>
        <v-btn raised color="purple lighten-4">Direction</v-btn>

        <v-card-text>
          <ul>
            <li v-for="item in ingredients" :key="item.index">{{item}}</li>
          </ul>
        </v-card-text>

        <v-card-text v-if="instructions.length">
          <p>Steps: </p>
          <ol>
            <li v-for="steps in instructions" :key="steps.number">{{steps.step}}</li>
          </ol>
        </v-card-text>

        <v-card-text v-if="instructionURL">
          <a :href="instructionURL" target="_blank">Recipe URL</a>
          <p></p>
        </v-card-text>

        <v-card-actions>
          <v-btn icon @click="scrollToTop">
            <v-icon>mdi-arrow-up-circle</v-icon>
          </v-btn>
          <v-btn absolute bottom right color="green darken-1" text @click="dialog =false">Back</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "recipeCard",
  props: {
    dishes: Array
  },
  data() {
    return {
      dialog: false,
      instructions: [],
      api_key: process.env.VUE_APP_API_KEY,
      url_base: "https://api.spoonacular.com/recipes",
      selectedDish: {},
      ingredients: [],
      instructionURL: "",
      timeCook: ""
    };
  },
  methods: {
    getRecipeIngredients: function(id) {
      this.ingredients.length = 0;
      this.instructions.length = 0;
      this.instructionURL = "";
      this.timeCook = "";

      const url = `${this.url_base}/${id}/information?&apiKey=${this.api_key}`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          result.extendedIngredients.forEach(element => {
            this.ingredients.push(element.name);
          });
          this.timeCook = result.readyInMinutes;
          if (result.analyzedInstructions.length === 0) {
            this.instructionURL = result.sourceUrl;
          } else {
            this.instructions = result.analyzedInstructions[0].steps;
          }
        });
    },
    scrollToTop() {
      document.getElementById("popup").scrollIntoView({
        behavior: "smooth"
      });
    }
  }
};
</script>

<style>
html {
  scroll-behavior: smooth;
}
.title {
  align-self: start;
  text-align: center;
}

.popup {
  
}
</style>