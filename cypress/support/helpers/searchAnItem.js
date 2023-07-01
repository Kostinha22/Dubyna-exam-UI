export function findProduct(product) {
    cy.get('body').then(body => {
        if (body.find(`.mat-card.mat-focus-indicator.mat-elevation-z6.ribbon-card ${product}`, { timeout: 1000 }).length > 0) {
            // cy.get(`${product}`).click();
            cy.get(`.mat-card.mat-focus-indicator.mat-elevation-z6.ribbon-card ${product}`).parents('.mat-grid-tile-content')
                .find('[aria-label="Add to Basket"]')
                .click();
        } else {
           cy.get('.mat-select-arrow.ng-tns-c130-12').click().get('#mat-option-5').click();
            //cy.get('.mat-select-arrow-wrapper').click().get('#mat-option-19 > .mat-option-text').contains('36').click();
            findProduct(product)
        }
    })
}




