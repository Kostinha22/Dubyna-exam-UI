class MainPage {
    closeWelcomePopUp() {
        return cy.get('.close-dialog > .mat-button-wrapper > span')

    }
    closeCookiePopUp() {
        return cy.get('.cc-btn.cc-dismiss')
    }
    clickBasketBtn() {
        return cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted > .mat-button-wrapper')
    }
    getCheckoutBtn() {
        return cy.get('#checkoutButton')
    }
    getNewAddressBtn() {
        return cy.get('div.ng-star-inserted > .mat-focus-indicator > .mat-button-wrapper > span')
    }

    getCktBtn(){
        return cy.get('#checkoutButton')
    }
    getMessagePopUp(){
        return cy.get('.mat-simple-snack-bar-content')
    }
    getAccountBtn(){
        return cy.get('#navbarAccount')
    }
    getLoginBtn(){
        return cy.get('#navbarLoginButton')
    }
    getIntoBasketMessage(){
        return cy.get('.mat-simple-snack-bar-content')
    }


}

export default new MainPage