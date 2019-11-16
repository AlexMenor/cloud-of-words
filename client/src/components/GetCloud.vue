<template>
  <div class="contentContainer">
    <vue-word-cloud
      :words="wordsSorted"
      :color="
        ([, weight]) =>
          weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'
      "
      font-family="Roboto"
    />
  </div>
</template>

<script>
import socket from "../socketio";
import VueWordCloud from "vuewordcloud";
export default {
  components: { [VueWordCloud.name]: VueWordCloud },
  data: () => ({
    words: new Map(),
    wordsSorted: [],
    maxWords: 10
  }),
  mounted() {
    socket.on("WORDS", newWords => {
      this.recalculate(newWords.split(" "));
    });
  },
  methods: {
    recalculate(arrayOfNewWords) {
      const newMap = new Map(this.words);
      arrayOfNewWords.forEach(word => {
        const currentValue = newMap.get(word);
        if (currentValue) newMap.set(word, currentValue + 1);
        else newMap.set(word, 1);
      });
      this.words = newMap;
    }
  },
  watch: {
    words: function(val) {
      const toReturn = [];
      val.forEach((key, value) => {
        toReturn.push([value, key]);
      });
      this.wordsSorted = toReturn
        .sort(([, a], [, b]) => (b < a ? -1 : b > a ? 1 : 0))
        .slice(0, this.maxWords);
    }
  }
};
</script>
