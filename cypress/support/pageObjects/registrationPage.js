class Registration {
    getMessagePopUp(){
        return cy.get('.mat-simple-snack-bar-content')
    }
    getValidationEmailMessage(){
        return cy.contains('not valid') // ng-tns-c119-11 ng-trigger ng-trigger-transitionMessages ng-star-inserted
    }
    getValidationPasswordMessage(){
        return cy.contains('characters long.') //ng-tns-c119-12 ng-trigger ng-trigger-transitionMessages ng-star-inserted
    }
    getValidationRepeatPasswordMessage(){
        return cy.contains('not match') //ng-tns-c119-12 ng-trigger ng-trigger-transitionMessages ng-star-inserted
    }

    getEmailField(){
        return cy.get('#emailControl')
    }
    getPasswordField(){
        return cy.get('#passwordControl')
    }
    getRepeatPasswordField(){
        return cy.get('#repeatPasswordControl')
    }

    getToggleBtn(){
        return cy.get('.mat-slide-toggle-bar')
    }

    getSecretWordDropdown(){
        return cy.get('#mat-select-value-3')
    }

    getChooseSecretWord(){
        return cy.get('#mat-option-13 > .mat-option-text')
    }

    getAnswerField(){
        return cy.get('#securityAnswerControl')
    }

    getRegistrationBtn(){
        return cy.get('#registerButton')
    }



}

export default new Registration

  
// cy.log('Authorize user');
// cy.get('#navbarAccount').click();
// cy.get('#navbarLoginButton').click()
// cy.get('#newCustomerLink').click()

// cy.log('Enter the valid registration data')
// cy.get('#emailControl').type(user.email)
// cy.get('#passwordControl').type(user.password)
// cy.get('#repeatPasswordControl').type(user.password)
// cy.get('.mat-slide-toggle-bar').click()

// cy.log('Choose the secret word')
// cy.get('#mat-select-value-3').click()
// cy.get('#mat-option-13 > .mat-option-text').click()
// cy.get('#securityAnswerControl').type(user.secretBook)

// cy.get('#registerButton').click()