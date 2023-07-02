export function login(user){
    cy.log('Login');
    cy.visit('/');
  
    cy.log('Check user is unauthorized');
   //  cy.getCookie('customer').should('be.null');  
  
    cy.log('Authorize user');
    cy.get('#navbarAccount').click();
    cy.get('#navbarLoginButton').click()
    cy.get('#email').type(user.email)
    cy.get('#password').type(user.password)
    cy.get('#rememberMe').click()
    cy.get('#loginButton').click()
    
}