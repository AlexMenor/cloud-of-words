<template>
  <div class="contentContainer">
    <v-card>
      <v-text-field v-model="words"></v-text-field>
      <v-btn @click="submitWords">Enviar</v-btn>
      <v-progress-circular v-if="loading"></v-progress-circular>
    </v-card>
  </div>
</template>

<script>
import socket from "../socketio";
export default {
  data: () => ({
    words: "",
    loading: false
  }),
  methods: {
    submitWords() {
      this.loading = true;
      socket.emit("WORDS", this.words, () => {
        this.loading = false;
      });
    }
  }
};
</script>
