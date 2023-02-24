import nav from "./nav.js";

const { createApp } = Vue;
createApp({
  data() {
    return {};
  },
  methods: {},

  mounted() {
    nav();
  },
  created() {},
}).mount("#root");
