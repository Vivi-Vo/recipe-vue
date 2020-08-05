<template>
  <v-row justify="center">
    <v-list v-for="dish in dishes" :key="dish.id">
      <v-img
        :src="dish.image"
        @click.stop="dialog=true;getRecipeIngredients(dish.id);selectedDish=dish"
      />
      <p>{{dish.title}}</p>
    </v-list>

    <v-dialog width="600px" v-model="dialog" id="popup">
      <v-card>
        <v-card-title>
          <span class="headline">{{selectedDish.title}}</span>
        </v-card-title>
        <v-card-text>
          <ul>
            <li v-for="item in ingredients" :key="item.index">{{item}}</li>
          </ul>
        </v-card-text>
        <v-btn raised color="purple lighten-4" @click="getInstruction(selectedDish.id)">Direction</v-btn>

        <v-card-text v-if="instructions.length">
          <ol>
            <li v-for="steps in instructions" :key="steps.number">{{steps.step}}</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small absolute bottom left icon @click="scrollToTop">
            <v-icon>mdi-arrow-up-circle</v-icon>
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Back</v-btn>
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
      ingredients: []
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
      var popup = document.getElementById("popup");
      popup.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
};
</script>

<style>
</style>