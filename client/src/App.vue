<template>
  <v-app>
    <v-app-bar app color="primary" dark src="./assets/toolbar-background.png">
      <v-img id="logo" src="./assets/logo.png" max-height="70px" max-width="70px"></v-img>
      <v-toolbar-title class="headline font-weight-light">Cloud Of Words</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="hideIfMobile">{{context}}</v-toolbar-title>
      <v-btn icon href="http://github.com/AlexMenor/cloud-of-words" target="_blank">
        <v-icon large>mdi-github-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    context() {
      return this.$route.query.context;
    }
  }
};
</script>

<style>
#logo {
  margin-right: 10px;
}
@media (max-width: 700px) {
  .hideIfMobile {
    display: none;
  }
}
</style>