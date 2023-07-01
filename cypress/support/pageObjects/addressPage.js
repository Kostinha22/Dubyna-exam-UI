class Address {

    getRadioBtn() {
        return cy.get(':nth-child(2) > .cdk-column-Name')
    }

    getContinueBtn() {
        return cy.get('[aria-label="Proceed to payment selection"]')
    }

    getAddress() {
        return cy.get('mat-cell.cdk-cell.cdk-column-Address.mat-column-Address.ng-star-inserted')
    }

    getMessagePopUp() {
        return cy.get('.mat-simple-snack-bar-content')
    }
}

export default new Address