class delivery {
    getRadioBtnDelivery() {
        return cy.get(':nth-child(4) > .cdk-column-Name')
    }
    getContinueBtnDelivery() {
        return cy.get('.nextButton > .mat-button-wrapper > span')
    }

}

export default new delivery