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
//
    getCityMessage() {
        return cy.contains('a city')
    }
    getAddressMessage() {
        return cy.contains('an address')
    }
    getMobilePhoneMessage() {
        return cy.contains('-9999999999 format')
    }
    getNameMessage() {
        return cy.contains('provide a name')
    }
    getCountryMessage() {
        return cy.contains('provide a country')
    }



}

export default new Checkout