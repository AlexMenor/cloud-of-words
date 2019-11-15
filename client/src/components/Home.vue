<template>
  <div class="contentContainer">
    <v-card id="createJoinCard" outlined hover shaped :loading="loading">
      <v-card-title v-if="stepOne">¿Qué quieres hacer?</v-card-title>
      <v-card-title v-if="wantsToCreate">Crear nueva nube</v-card-title>
      <v-card-title v-if="wantsToJoin">Unirse a una nube</v-card-title>
      <div v-if="stepOne" class="buttonGroup">
        <v-btn outlined v-on:click="wantsToCreate = true">Crear una nube de palabras</v-btn>
        <v-btn outlined v-on:click="wantsToJoin = true">Unirme a una nube de palabras</v-btn>
      </div>
      <div v-if="!stepOne" class="roomInput">
        <v-text-field
          outlined
          v-model="roomName"
          :error="error"
          :error-messages="errorMsg"
          placeholder="Nombre de la nube"
        ></v-text-field>
        <v-spacer></v-spacer>
        <div class="buttonRow">
          <v-btn outlined v-on:click="wantsToCreate = wantsToJoin = false">Atrás</v-btn>
          <v-btn outlined v-on:click="submitRoom">Go</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import socket from "../socketio";
export default {
  name: "Home",
  components: {},

  data: () => ({
    wantsToJoin: false,
    wantsToCreate: false,
    roomName: "",
    loading: false,
    error: false,
    errorMsg: ""
  }),
  computed: {
    stepOne() {
      return !this.wantsToJoin && !this.wantsToCreate;
    }
  },
  methods: {
    submitRoom() {
      if (!this.roomName) return;
      this.loading = true;
      const { roomName } = this;
      if (this.wantsToJoin) socket.emit("JOIN_ROOM", { roomName }, this.next);
      else if (this.wantsToCreate)
        socket.emit("CREATE_ROOM", { roomName }, this.next);
    },
    next(res) {
      this.loading = false;
      if (res) {
        if (this.wantsToCreate) this.$router.push("/getcloud");
        if (this.wantsToJoin) this.$router.push("/putwords");
      } else {
        this.roomName = "";
        this.error = true;
        if (this.wantsToCreate)
          this.errorMsg = "La nube que quieres crear ya existe";
        else this.errorMsg = "La nube a la que te quieres unir no existe";
      }
    }
  }
};
</script>

<style>
.contentContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
  flex-direction: column;
}
#createJoinCard {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
@media (max-width: 600px) {
  #createJoinCard {
    margin-top: 2em;
    width: 100%;
    height: 100%;
  }
}
@media (min-width: 600px) {
  #createJoinCard {
    width: 60%;
    height: 60%;
    padding: 5em;
  }
}
.buttonGroup {
  margin-top: 0.5em;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.buttonGroup .v-btn {
  margin: 0.5em;
}
.buttonRow {
  display: flex;
  justify-content: space-around;
}
</style>
