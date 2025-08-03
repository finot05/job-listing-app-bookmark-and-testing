import { defineConfig } from "cypress";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", 
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    env: {
      PASSWORD: process.env.PASSWORD, // Make PASSWORD available in Cypress
    },
  },
});
