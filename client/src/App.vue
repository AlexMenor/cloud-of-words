<template>
  <v-app>
    <v-app-bar app color="primary" dark src="./assets/toolbar-background.png">
      <v-img id="logo" src="./assets/logo.png" max-height="70px" max-width="70px"></v-img>
      <v-toolbar-title class="headline font-weight-light">Cloud Of Words</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({})
};
</script>

<style>
#logo {
  margin-right: 10px;
}
</style>