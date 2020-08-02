<template>
  <v-row justify="center">
    <div v-for="dish in dishes" :key="dish.id">
      <v-img :src="dish.image" @click.stop="dialog=true;getRecipeIngredients(dish.id);selectedDish=dish.title" />
      <p>{{dish.title}}</p>
    </div>

    <v-dialog dark width="600px" v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">{{selectedDish}}</span>
        </v-card-title>
        <v-card-text>{{instructions}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
      api_key: "8056c060793247a1a67cd935a4434d5f",
      url_base: "https://api.spoonacular.com/recipes",
      selectedDish: ""
    };
  },
  methods: {
    getRecipeIngredients: function(id) {
      console.log("calling");
      const url = `${this.url_base}/${id}/ingredientWidget.json?apiKey=${this.api_key}`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          this.instructions = result;
        });
    }
  }
};
</script>

<style>
</style>