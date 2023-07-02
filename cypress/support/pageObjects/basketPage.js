class Basket {
    clickBasketBtn() {
        return cy.get('.mat-toolbar-row > .mat-focus-indicator.ng-star-inserted > .mat-button-wrapper')
    }
}

export default new Basket