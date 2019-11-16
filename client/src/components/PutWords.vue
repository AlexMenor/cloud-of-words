<template>
  <div class="contentContainer">
    <v-card class="createJoinCard" outlined hover shaped :loading="loading">
      <v-card-title v-if="!done" class="font-italic">{{context}}</v-card-title>
      <div class="inputGroup">
        <v-text-field v-if="!done" v-model="words" outlined placeholder="¡Sé breve!"></v-text-field>
        <v-btn v-if="!done" @click="submitWords" color="primary">Enviar</v-btn>
      </div>
      <div v-if="done" class="inputGroup">
        <p v-if="success">¡Gracias!</p>
        <v-icon v-if="success" color="success" x-large>mdi-check</v-icon>
        <p v-if="!success">¡No hemos podido enviar tu respuesta!</p>
        <p v-if="!success">Es probable que el creador la haya cerrado.</p>
        <v-icon v-if="!success" x-large>mdi-emoticon-sad-outline</v-icon>
      </div>
    </v-card>
  </div>
</template>

<script>
import socket from "../socketio";
export default {
  data: () => ({
    words: "",
    loading: false,
    done: false,
    success: true
  }),
  methods: {
    submitWords() {
      this.loading = true;
      socket.emit("WORDS", this.words, res => {
        this.loading = false;
        this.done = true;
        this.success = res;
      });
    }
  },
  computed: {
    context() {
      return this.$route.query.context;
    }
  }
};
</script>

<style>
.inputGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
