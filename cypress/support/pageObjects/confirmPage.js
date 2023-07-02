class Confirm {
    
    getMessagePopUp() {
        return cy.get('[fxflex="60%"] > :nth-child(1) > .confirmation')
    }
}

export default new Confirm