class Captcha {

    getCommentField(){
      return  cy.get('#comment')
    }
    getRaitingSlider(){
      return  cy.get('#rating')
    }
    getReviewBtn(){
      return  cy.get('[aria-label="Button to send the review"]')
    }
    getMessagePopUp(){
      return  cy.get('.mat-simple-snack-bar-content')
    }

}

export default new Captcha 