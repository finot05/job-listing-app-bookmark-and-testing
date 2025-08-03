describe('Bookmark Feature - E2E Test', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('http://localhost:3000/jobs');
  });

  it('should not show bookmark button when user is not authenticated', () => {
    cy.get('[data-testid="bookmark-button"]').should('not.exist');
  });

  it('should login and show bookmark buttons', () => {
    cy.contains('Login').click();
    cy.get('input[name="email"]').type('finoteloza.sisay@a2sv.org');
    cy.get('input[name="password"]').type(Cypress.env('PASSWORD')); // Replace with real password
    cy.get('form').submit();

    // Wait for login to fully complete
    cy.url({ timeout: 10000 }).should('not.include', '/signin');

    cy.visit('http://localhost:3000/jobs');

    // Wait for job data to render fully
    cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should('exist');
  });

  it('should bookmark and unbookmark a job successfully', () => {
    cy.contains('Login').click();
    cy.get('input[name="email"]').type('finoteloza.sisay@a2sv.org');
    cy.get('input[name="password"]').type(Cypress.env('PASSWORD'));
    cy.get('form').submit();
    cy.url({ timeout: 10000 }).should('not.include', '/signin');

    cy.visit('http://localhost:3000/jobs');

    // Intercept API calls
    cy.intercept('POST', '**/bookmarks/**').as('addBookmark');
    cy.intercept('DELETE', '**/bookmarks/**').as('removeBookmark');

    // Wait for bookmark buttons
    cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).should('exist').first().as('bookmarkBtn');

    // Check bookmark state
    cy.get('@bookmarkBtn').invoke('attr', 'data-bookmarked').then((value) => {
      const isBookmarked = value === 'true';

      if (isBookmarked) {
        // Unbookmark first
        cy.get('@bookmarkBtn').click();
        cy.wait('@removeBookmark', { timeout: 10000 }).its('response.statusCode').should('eq', 200);

        // Re-bookmark
        cy.get('@bookmarkBtn').click();
        cy.wait('@addBookmark', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
      } else {
        // Bookmark
        cy.get('@bookmarkBtn').click();
  
  // Wait for the addBookmark request and check the response
  cy.wait('@addBookmark', { timeout: 20000 })
    .its('response.statusCode')
    .then((statusCode) => {
      if (statusCode === 200) {
        // Successfully bookmarked
        cy.log('Bookmark added successfully');
      } else if (statusCode === 409) {
        // Handle case where the bookmark already exists
        cy.log('Bookmark already exists, unbookmarking now');
        // You may want to unbookmark it here or handle it accordingly
        cy.get('@bookmarkBtn').click(); // Unbookmark
      } else {
        throw new Error(`Unexpected status code: ${statusCode}`);
      }
    });

        // Then unbookmark
        cy.get('@bookmarkBtn').click();
        cy.wait('@removeBookmark', { timeout: 10000 }).its('response.statusCode').should('eq', 200);
      }
    });
  });

  it('should show bookmarked job in bookmarked list page', () => {
    cy.contains('Login').click();
    cy.get('input[name="email"]').type('finoteloza.sisay@a2sv.org');
    cy.get('input[name="password"]').type(Cypress.env('PASSWORD'));
    cy.get('form').submit();
    cy.url({ timeout: 15000 }).should('not.include', '/signin');

    cy.visit('http://localhost:3000/jobs');

    cy.get('[data-testid="bookmark-button"]', { timeout: 15000 }).first().click();

    cy.visit('http://localhost:3000/bookmarks');

    cy.get('[data-testid="job-card"]', { timeout: 25000 }).should('exist');
  });
});
