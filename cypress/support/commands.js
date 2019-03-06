Cypress.Commands.add('getLastEmail', email => {
  function requestEmail() {
    return cy
      .request({
        method: 'GET',
        url: 'http://localhost:4003/last-email',
        headers: {
          'content-type': 'application/json',
        },
        qs: {
          email,
        },
        json: true,
      })
      .then(({ body }) => {
        if (body) {
          return body;
        }

        // If body is null, it means that no email was fetched for this address.
        // We call requestEmail recursively until an email is fetched.
        // We also wait for 300ms between each call to avoid spamming our server with requests
        cy.wait(300);

        return requestEmail();
      });
  }

  return requestEmail();
});
