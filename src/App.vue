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
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=League+Script&display=swap");
#app {
  color: rgb(46, 44, 44);
  font-family: roboto;
  /* min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  margin: 0;
  /* background-image: url(./assets/cute-background.jpg); */
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