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

    getExpireMonth(){
        return  cy.get('select').eq(0).select('1').should('have.value', '1')
    }
    getExpireYear(){
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
    getNameMessage(){
        return cy.contains('provide a name')
    }
    getCardMessage(){
        return cy.contains('your card number')
    }

}

export default new CardData