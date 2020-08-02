<template>
  <v-app id="app">
    <home username="Chloe"></home>
  </v-app>
</template>

<script>
import home from "./components/Home";

export default {
  name: "app",
  components: {
    home
  },
  methods: {
    getInstruction: function(id) {
      const url = `${this.url_base}/${id}/analyzedInstructions?&apiKey=${this.api_key}&stepBreakdown=true`;
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