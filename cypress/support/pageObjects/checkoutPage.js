class Checkout {

    // страница чекаута 

    getCheckoutBtn() {
        return cy.get('#checkoutButton')
    }
    getNewAddressBtn() {
        return cy.get('div.ng-star-inserted > .mat-focus-indicator > .mat-button-wrapper > span')
    }

    getCountry() {
        return cy.get('[data-placeholder="Please provide a country."]')
    }

    getName() {
        return cy.get('[placeholder="Please provide a name."]')
    }

    getMobileNumber() {
        return cy.get('[data-placeholder="Please provide a mobile number."]')
    }

    getZip() {
        return cy.get('[data-placeholder="Please provide a ZIP code."]')
    }

    getAddress() {
        return cy.get('[placeholder="Please provide an address."]')
    }

    getCity() {
        return cy.get('[data-placeholder="Please provide a city."]')
    }

    getState() {
        return cy.get('[data-placeholder="Please provide a state."]')
    }

    getSubmitBtn() {
        return cy.get('#submitButton')
    }



}

export default new Checkout