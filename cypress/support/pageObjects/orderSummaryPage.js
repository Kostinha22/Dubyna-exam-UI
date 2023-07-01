class OrderSummary {
    getProceedToReview(){
        return cy.get('[aria-label="Proceed to review"]')
    }

}

export default new OrderSummary