<template>
  <v-app>
    <v-app-bar app color="primary" dark src="./assets/toolbar-background.png">
      <div class="clickable" @click="$router.push('/')">
        <v-img id="logo" src="./assets/logo.png" max-height="70px" max-width="70px"></v-img>
        <v-toolbar-title
          @click="$router.push('/')"
          class="clickable headline font-weight-light"
        >Cloud Of Words</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-title class="hideIfMobile">{{ context }}</v-toolbar-title>
      <v-btn
        class="clickable"
        icon
        href="http://github.com/AlexMenor/cloud-of-words"
        target="_blank"
      >
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
      const context = this.$route.query.context;
      if (context) return context.toUpperCase();
      else return null;
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
.clickable {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.clickable:hover {
  opacity: 0.6;
}
</style>
