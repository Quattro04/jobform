
describe('borix-taming', () => {
  beforeEach(() => {
    // Start from the index page
    cy.visit('http://localhost:4200/')
  });

  // it('should navigate to the apply page', () => {
  //   // Find a link with an href attribute containing "apply" and click it
  //   cy.get('a[href*="/apply"]').click()

  //   // The new url should include "/apply"
  //   cy.url().should('include', '/apply')

  //   // The new page should contain an h1 with company info
  //   cy.get('h1').contains('Please fill out the form to apply!')
  // })

  it('should fill and submit apply form', () => {
    // Find a link with an href attribute containing "apply" and click it
    cy.get('a[href*="/apply"]').click()

    // The new url should include "/apply"
    cy.url().should('include', '/apply')

    // Find first_name field and fill it
    cy.get('input[name*="first_name"]').type('Janez').should('have.value', 'Janez')
    // Find last_name field and fill it
    cy.get('input[name*="last_name"]').type('Novak').should('have.value', 'Novak')
    // Find email field and fill it
    cy.get('input[name*="email"]').type('janez@novak.com').should('have.value', 'janez@novak.com')
    // Click next step button
    cy.get('button[name*="next_step"]').click()
    cy.screenshot()

    // Find motivational paragraph field and fill it
    cy.get('textarea[name*="motivational_paragraph"]').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nisl, eleifend a lectus vel, commodo congue ex. Nunc rhoncus et justo vel rhoncus. In tincidunt odio est, nec ornare orci vulputate sit amet.').should('have.value', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nisl, eleifend a lectus vel, commodo congue ex. Nunc rhoncus et justo vel rhoncus. In tincidunt odio est, nec ornare orci vulputate sit amet.')
    // Find select and select value 3
    cy.get('select[name*="degree_of_education"]').select('3')
    cy.screenshot()

    // Click submit button
    cy.get('input[name*="apply"]').click()
    // Check if URL equals to form POST url
    cy.url().should('equal', 'http://mockbin.com/request?foo=bar&foo=baz')
  })
});
