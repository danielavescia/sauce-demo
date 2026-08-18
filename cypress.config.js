import { defineConfig } from 'cypress';
import { plugin as cypressGrepPlugin } from '@cypress/grep/plugin';
import { allureCypress } from 'allure-cypress/reporter';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      cypressGrepPlugin(config);

      allureCypress(on, config, {
        resultsDir: 'allure-results',
      });

      return config;
    },
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
