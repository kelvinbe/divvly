import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    viewportWidth: 1920,
    viewportHeight: 1200,
    baseUrl: 'http://localhost:3000',
  },
});
