/// <reference types="cypress" />
import '../support/commands';

describe('Бургер конструктор — UI и логика', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.setAuth();
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearAuth();
  });

  it('Навигация по вкладкам "Булки / Соусы / Начинки" и скролл', () => {
    cy.contains('Соусы').click();
    cy.contains('Соус Spicy-X').scrollIntoView().should('be.visible');
    cy.contains('Начинки').click();
    cy.contains('Биокотлета из марсианской Магнолии').scrollIntoView().should('be.visible');
    cy.contains('Булки').click();
    cy.contains('Краторная булка N-200i').scrollIntoView().should('be.visible');
  });

  it('Открытие и закрытие модалки по клику на ингредиент (background modal)', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.url().should('include', '/ingredients/');
    cy.get('#modals', { timeout: 8000 }).within(() => {
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Краторная булка N-200i').should('exist');
      cy.get('button[type="button"]').click();
    });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('Открытие ингредиента по прямому URL (страница)', () => {
    cy.visit('/ingredients/643d69a5c3f7b9001cfa093c');
    cy.contains('Краторная булка N-200i').should('exist');
  });

  it('Добавление ингредиента в конструктор', () => {
    cy.contains(/Выберите\s+булки/i).should('exist');
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.contains(/Выберите\s+булки/i).should('not.exist');
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains(/Выберите\s+начинку/i).should('exist');
    cy.contains('Филе Люминесцентного тетраодонтимформа')
      .parents('li')
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.contains(/Выберите\s+начинку/i).should('not.exist');
    cy.contains('Филе Люминесцентного тетраодонтимформа').should('exist');
  });


  it('Сборка и заказ бургера', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => cy.contains('Добавить').click());

    cy.contains('Филе Люминесцентного тетраодонтимформа')
      .parents('li')
      .within(() => cy.contains('Добавить').click());

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.fixture('order.json').then((json) => {
      cy.contains(json.order.number.toString()).should('exist');
    });

    cy.get('#modals button[type="button"]').click();

    cy.contains(/Выберите\s+булки/i).should('exist');
    cy.contains(/Выберите\s+начинку/i).should('exist');
    cy.contains('0').should('exist');
  });
});
