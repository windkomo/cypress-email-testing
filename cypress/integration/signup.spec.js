const faker = require('faker');

describe('signing up', () => {
  const randomEmail = faker.internet.email();

  it('should display the email sent page after filling and submit the sign up form', () => {
    cy.visit('/');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(faker.internet.password());
    cy.get('form[name="signup"]').submit();

    cy.contains('Email sent!');
  });

  it('should send an email containing a verification link', () => {
    cy.getLastEmail(randomEmail).then(email => {
      const link = email.match(/href="([^"]*)/)[1];
      cy.visit(link);
      cy.contains('Your email adress has been verified!');
    });
  });
});
