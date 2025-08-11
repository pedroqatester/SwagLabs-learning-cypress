const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ci7q4w",
  e2e: {
    setupNodeEvents(on, config) {
      config.env.USERS = JSON.parse(process.env.USERS || '{}');
      return config;
    },
  },
});
