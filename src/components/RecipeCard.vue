<template>
  <v-row justify="center" alignment="center">
    <v-col v-for="dish in dishes" :key="dish.id" cols="6">
      <v-card>
        <div class="flex flex-no-wrap justify-space-between">
          <v-img
            :src="dish.image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            @click.stop="dialog=true;getRecipeIngredients(dish.id);selectedDish=dish"
          />
          <v-card-title v-text="dish.title"></v-card-title>
        </div>
      </v-card>
    </v-col>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title id="popup">
          <span class="headline">{{selectedDish.title}}</span>
        </v-card-title>
        <v-card-text>
          <ul>
            <li v-for="item in ingredients" :key="item.index">{{item}}</li>
          </ul>
        </v-card-text>
        <v-btn
          raised
          color="purple lighten-4"
          @click="getInstruction(selectedDish.id)"
        >Get Direction</v-btn>

        <v-card-text v-if="instructions.length">
          <ol>
            <li v-for="steps in instructions" :key="steps.number">{{steps.step}}</li>
          </ol>
        </v-card-text>

        <v-card-actions>
          <v-btn icon @click="scrollToTop">
            <v-icon>mdi-arrow-up-circle</v-icon>
          </v-btn>
          <v-btn absolute bottom right color="green darken-1" text @click="dialog = false">Back</v-btn>
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
      instructionURL: ""
    };
  },
  methods: {
    getRecipeIngredients: function(id) {
      this.ingredients.length = 0;
      this.instructions.length = 0;
      const url = `${this.url_base}/${id}/ingredientWidget.json?apiKey=${this.api_key}`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          result.ingredients.forEach(element => {
            this.ingredients.push(element.name);
          });
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
</style>