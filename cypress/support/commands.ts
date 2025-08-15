/// <reference types="cypress" />

Cypress.Commands.add('setAuth', () => {
  localStorage.setItem('refreshToken', 'test-refresh');
  cy.setCookie('accessToken', 'Bearer test-access');
});

Cypress.Commands.add('clearAuth', () => {
  localStorage.removeItem('refreshToken');
  cy.clearCookie('accessToken');
});

declare global {
  namespace Cypress {
    interface Chainable {
      setAuth(): Chainable<void>;
      clearAuth(): Chainable<void>;
    }
  }
}
export {};
