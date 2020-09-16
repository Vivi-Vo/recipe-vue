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

    <v-dialog id="popup" v-model="dialog">
      <v-card>
        <v-card-title id="dishTitle">
          <span class="headline">{{selectedDish.title}}</span>
        </v-card-title>

        <v-avatar size="200" >
          <v-img :src="recipeURL" />
        </v-avatar>        

      <v-card-text>
          <span class="headline">Time Cook: {{timeCook}} minutes</span>
        </v-card-text>

        <v-btn class="btn mb-4" raised color="purple lighten-4" @click="showIngredient=!showIngredient">Ingredients</v-btn>
        <v-card-text v-if="showIngredient">
          <ul>
            <li v-for="item in ingredients" :key="item.index">{{item}}</li>
          </ul>
        </v-card-text>

        <v-spacer></v-spacer>
        <v-btn raised color="purple lighten-4" @click="showInstruction=!showInstruction">Direction</v-btn> 


        <v-card-text v-if="showInstruction">
          <ol>
            <li v-for="steps in instructions" :key="steps.number">{{steps.step}}</li>
          </ol>
        </v-card-text>

        <v-card-text v-if="showInstruction && instructionURL">
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
      timeCook: "",
      recipeURL: "",
      showIngredient: false,
      showInstruction: false
    };
  },
  methods: {
    getRecipeIngredients: function(id) {
      this.resetState(); 
      const url = `${this.url_base}/${id}/information?&apiKey=${this.api_key}`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          result.extendedIngredients.forEach(element => {
            this.ingredients.push(element.name);
          });
          this.timeCook = result.readyInMinutes;
          this.recipeURL = result.image;
          if (result.analyzedInstructions.length === 0) {
            this.instructionURL = result.sourceUrl;
          } else {
            this.instructions = result.analyzedInstructions[0].steps;
          }
        });
    },
    resetState: function(){
      this.ingredients.length = 0;
      this.instructions.length = 0;
      this.instructionURL = "";
      this.timeCook = "";
      this.showIngredient = false;
      this.showInstruction = false
      },

    scrollToTop() {
      document.getElementById("dishTitle").scrollIntoView({
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
};
.dishTitle{
  align-self: start;
  text-align: center;
  font-size: small;
  }

</style>