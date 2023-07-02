export function registration(user){

    cy.log('Login');
    cy.visit('/');
  
    cy.log('Check user is unauthorized');
   //  cy.getCookie('customer').should('be.null');  
  
    cy.log('Authorize user');
    cy.get('#navbarAccount').click();
    cy.get('#navbarLoginButton').click()
    cy.get('#newCustomerLink').click()

    cy.log('Enter the valid registration data')
    cy.get('#emailControl').type(user.email)
    cy.get('#passwordControl').type(user.password)
    cy.get('#repeatPasswordControl').type(user.password)
    cy.get('.mat-slide-toggle-bar').click()

    cy.log('Choose the secret word')
    cy.get('#mat-select-value-3').click()
    cy.get('#mat-option-13 > .mat-option-text').click()
    cy.get('#securityAnswerControl').type(user.secretBook)

    cy.get('#registerButton').click()
    
}