<template>
  <div class="contentContainer">
    <ul>
      <li v-for="(phrase, i) in phrases" :key="i">{{phrase}}</li>
    </ul>
  </div>
</template>

<script>
import socket from "../socketio";
export default {
  data: () => ({
    phrases: []
  }),
  mounted() {
    socket.on("WORDS", words => {
      this.phrases.push(words);
    });
  }
};
</script>