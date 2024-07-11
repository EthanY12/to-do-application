// cypress/integration/user_end_testing.spec.js

describe('User End Testing', () => {
  const baseUrl = 'http://localhost:3000'; // Change this to your frontend URL
  const apiUrl = 'http://localhost:5000'; // Change this to your backend URL

  const username = 'cypressuser';
  const password = 'password123';

  it('should register a new user', () => {
    // Register the user
    cy.request({
      method: 'POST',
      url: `${apiUrl}/register`,
      body: {
        username,
        password
      },
      // Prevents Cypress from failing the test if the user already exists
      failOnStatusCode: false 
    }).then((response) => {
      // Expect status 201 for created or 400 if user already exists
      expect(response.status).to.be.oneOf([201, 400]); 
    });
  });

  it('should login, create, edit, and delete a ticket', () => {
    // Log in the registered user
    cy.visit(`${baseUrl}/login`);

    cy.get('#login-username').type(username);
    cy.get('#login-password').type(password);
    cy.get('button[type="submit"]').click();

    // Verify login by checking URL
    cy.url().should('include', '/tickets');

    // Create a new ticket
    cy.contains('New Ticket').should('be.visible').click();

    // Fill out the ticket form
    cy.get('input[type="text"]').first().type('Cypress Test Ticket'); // Use the appropriate input selector
    cy.get('input[type="text"]').eq(1).type('Cypress Test Description'); // Use the appropriate input selector
    cy.get('input[type="date"]').type('2024-06-25');
    cy.get('input[type="time"]').type('10:00'); // Set the time value directly
    cy.get('button[type="submit"]').contains('Add Ticket').click();

    // Wait for the ticket to be created
    cy.wait(2000); // Wait for 2 seconds to allow the ticket to be created

    // Verify the ticket was created
    cy.contains('Cypress Test Ticket', { timeout: 10000 }).should('exist'); // Increase the timeout to wait for the element

    // Edit the created ticket
    cy.contains('Cypress Test Ticket').parent().parent().find('button').contains('Edit').click();

    // Update the ticket title
    cy.get('input[type="text"]').first().clear().type('Updated Cypress Test Ticket'); // Use the appropriate input selector
    cy.get('button[type="submit"]').contains('Update Ticket').click();

    // Wait for the ticket to be updated
    cy.wait(2000); // Wait for 2 seconds to allow the ticket to be updated

    // Verify the ticket was updated
    cy.contains('Updated Cypress Test Ticket', { timeout: 10000 }).should('exist'); // Increase the timeout to wait for the element

    // Delete the created ticket
    cy.contains('Updated Cypress Test Ticket').parent().parent().find('button').contains('Delete').click();

    // Wait for the ticket to be deleted
    cy.wait(2000); // Wait for 2 seconds to allow the ticket to be deleted

    // Verify the ticket was deleted
    cy.contains('Updated Cypress Test Ticket', { timeout: 10000 }).should('not.exist'); // Increase the timeout to wait for the element to disappear
  });
});
