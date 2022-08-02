/* eslint-disable no-undef */

describe('index is working', () => {
  it('Page is working', () => {
    cy.visit('localhost:3000');
    cy.get('.loading-container').should('not.exist');
    cy.get('.error-container').should('not.exist');
    cy.get('.country-container');
  });
  it('Loading is working', () => {
    cy.visit('localhost:3000');
    cy.intercept('https://restcountries.com/v3.1/all', {
      delay: 100,
    });
    cy.get('.loading-container');
  });

  it('Error is working', () => {
    cy.visit('localhost:3000');
    cy.intercept('https://restcountries.com/v3.1/all', {
      forceErrorNetwork: true,
    });
    cy.get('.error-container');
  });
});

describe('index tool are working', () => {
  it('filter by continent is working', () => {
    cy.visit('localhost:3000');
    cy.findByRole('combobox').select('Africa');
    cy.findByRole('heading', {
      name: /botswana/i,
    });
  });

  it('filter by name is working', () => {
    cy.visit('localhost:3000').wait(1000);
    cy.get('.nav-search')
      .type('colombia{enter}')
      .trigger('input');
    cy.get('.country-container').children().should('have.length', 1);
  });
});

describe('country page is working', () => {
  it('going to a country page directly is working', () => {
    cy.visit('localhost:3000/gl');
    const heading = cy.findByRole('heading', {
      name: /greenland/i,
    });
    heading.findByText(/greenland/i).should('exist');
  });

  it('going to a country clicking the flag button has the correct url path', () => {
    cy.visit('localhost:3000');
    cy.findByRole('img', {
      name: /greenland's flag/i,
    }).click();
    cy.url().should('eq', 'http://localhost:3000/GL');
  });

  it('going to a country page directly is working', () => {
    cy.visit('localhost:3000/gl');
    cy.findByRole('button', {
      name: /back/i,
    }).click();
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('going to a country page from another contry page is working', () => {
    cy.visit('localhost:3000/col');
    cy.findByRole('button', {
      name: /bra/i,
    }).click();
    cy.url().should('eq', 'http://localhost:3000/BRA');
  });
});
