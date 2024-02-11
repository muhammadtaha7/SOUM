const usernames = [
  "standard_user",
  "performance_glitch_user",
  "error_user",
  "visual_user",
];
const password = "secret_sauce";
const randomIndex = Math.floor(Math.random() * usernames.length);
const selectedUsername = usernames[randomIndex];

Cypress.Commands.add("Login", () => {
  cy.get('[data-test="username"]').type(selectedUsername);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});
Cypress.Commands.add("UnsuccessfullLogin", () => {
  cy.get('[data-test="username"]').type(selectedUsername);
  cy.get('[data-test="password"]').type("rwrwrew");
  cy.get('[data-test="login-button"]').click();
});
