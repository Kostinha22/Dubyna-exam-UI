/// <reference types="cypress"/>
import Registration from "../support/pageObjects/registrationPage"
import MainPage from "../support/pageObjects/mainPage"
import Checkout from "../support/pageObjects/checkoutPage"
import Basket from "../support/pageObjects/basketPage"
import Address from "../support/pageObjects/addressPage"
import Delivery from "../support/pageObjects/deliveryPage"
import CardData from "../support/pageObjects/cardDataPage"
import OrderSummary from "../support/pageObjects/orderSummaryPage"
import Confirm from "../support/pageObjects/confirmPage"
import Captcha from "../support/pageObjects/captchaPage"
import user from "../fixtures/user.json"
import product from "../fixtures/product.json"
import billingData from "../fixtures/billingData.json"
import { solveCaptcha } from "../support/helpers/solveCapctha"
import { findProduct } from "../support/helpers/searchAnItem"
import { faker } from "@faker-js/faker"
import { registration } from "../support/helpers/registrationHelper"
import { login } from "../support/helpers/loginHelper"
//import { loginViaAPI } from "../support/helpers/LoginViaAPI"


user.email = faker.internet.email()
user.password = faker.internet.password({ length: 20, pattern: /[A-z]/, prefix: '!1' })
user.secretBook = faker.animal.bird()
user.username = faker.person.fullName()

billingData.address = faker.location.secondaryAddress()
billingData.country = faker.location.country()
billingData.cardNumber = faker.finance.creditCardNumber('63[7-9]#############')
billingData.city = faker.location.city()
billingData.zip = faker.location.zipCode('####')
billingData.mobileNumber = faker.phone.number('1######-9########')
billingData.name = faker.person.fullName()
billingData.comment = faker.word.words({ count: { min: 5, max: 10 } })


beforeEach('Close pop-ups, Register and login User', () => {
  cy.visit('/')

  cy.log('Close pop-ups')
  MainPage.closeWelcomePopUp().click();
  MainPage.closeCookiePopUp().click()

  cy.log('Register user')
  registration(user)
  Registration.getMessagePopUp().should('have.text', 'Registration completed successfully. You can now log in.')

  cy.log('Login')
  login(user)
  // loginViaAPI(user)

})

it('Search and buy product ', () => {
  cy.log('Find product')
  findProduct(product.appleJuice)
  cy.get('.mat-simple-snack-bar-content').should('contain', `into basket.`)

  cy.log('Check the product in the shopping cart')
  Basket.clickBasketBtn().click()

  cy.log('add the billing data')
  Checkout.getCheckoutBtn().click()
  Checkout.getNewAddressBtn().click()
  Checkout.getCountry().type(billingData.country)
  Checkout.getName().type(user.username)
  Checkout.getMobileNumber().type(billingData.mobileNumber)
  Checkout.getZip().type(billingData.zip)
  Checkout.getAddress().type(billingData.address)
  Checkout.getCity().type(billingData.city)
  Checkout.getState().type(billingData.state)
  Checkout.getSubmitBtn().click()

  cy.log('Product comfirmation page')
  Address.getAddress().should('contain', `${billingData.address}, ${billingData.city}, ${billingData.state}, ${billingData.zip}`)
  Address.getRadioBtn().click()
  Address.getContinueBtn().click()
  Address.getMessagePopUp().should('contain', 'to your addresses')

  cy.log('Choose the delivery option')
  Delivery.getRadioBtnDelivery().click()
  Delivery.getContinueBtnDelivery().click()

  cy.log('Add card data')
  CardData.getAddNewCardBtn().click()
  CardData.getNameOnCard().type(user.username)
  CardData.getCardNumber().type(billingData.cardNumber)
  CardData.getSelectElement()
  CardData.getSecondSelectElement()
  CardData.getSubmitButton().click()
  CardData.getRadioButton().click()
  CardData.getMessagePopUp().should('contain', 'been saved for your convenience')

  OrderSummary.getProceedToReview().click()

  cy.log('Product purchase information')
  MainPage.getCktBtn().click()

  cy.log('Confirmation page')
  Confirm.getMessagePopUp().should('have.text', 'Thank you for your purchase!')

  solveCaptcha()
  Captcha.getCommentField().type(`${billingData.comment}`)
  Captcha.getRaitingSlider()
    .trigger('mousedown', { button: 0, force: true })
    .trigger('mousemove', { clientX: 200, clientY: 0, force: true })
    .trigger('mouseup', { button: 0, force: true });

  Captcha.getReviewBtn().click()
  Captcha.getMessagePopUp().should('have.text', 'Thank you for your feedback.')

})




