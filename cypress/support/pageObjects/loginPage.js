class LoginPage{
    getNewCustomerLink(){
        return cy.get('#newCustomerLink')
    }
    getEmailField(){
        return cy.get('#email')
    }
    getPasswordField(){
        return cy.get('#password')
    }
    getRememberMe(){
        return cy.get('#rememberMe')
    }
    getLoginButton(){
        return cy.get('#loginButton')
    }
    getValidationLoginMessage(){
        return cy.contains('email')
    }

}

export default new LoginPage

