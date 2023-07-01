class CardData {
    getAddNewCardBtn(){
        return cy.get('#mat-expansion-panel-header-0')
    }
    getNameOnCard(){
        return cy.get('input[id^="mat-input"]').eq(1)
    }
    getCardNumber(){
        return cy.get('input[id^="mat-input-"]').eq(2)
    }

    getSelectElement(){
        return  cy.get('select').eq(0).select('1').should('have.value', '1')
    }
    getSecondSelectElement(){
        return cy.get('select').eq(1).select('2080').should('have.value', '2080')
    }
    getSubmitButton(){
        return cy.get('#submitButton')
    }
    getRadioButton(){
        return cy.get('.mat-radio-outer-circle').eq(0)
    }
    getSubmitButton(){
        return cy.get('#submitButton')
    }
    getMessagePopUp(){
        return cy.get('.mat-simple-snack-bar-content')
    }

}

export default new CardData