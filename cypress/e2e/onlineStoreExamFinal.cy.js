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
import invalidUser from "../fixtures/invalidUser.json"
import product from "../fixtures/product.json"
import billingData from "../fixtures/billingData.json"
import invalidBillingData from "../fixtures/invalidBillingData.json"
import { solveCaptcha } from "../support/helpers/solveCapctha"
import { findProduct } from "../support/helpers/searchAnItem"
import { faker } from "@faker-js/faker"
// import { registration } from "../support/helpers/registrationHelper"
// import { login } from "../support/helpers/loginHelper"
import loginPage from "../support/pageObjects/loginPage"
// import { loginViaAPI } from "../support/helpers/LoginViaAPI"


user.email = faker.internet.email()
user.password = faker.internet.password({ length: 20, pattern: /[A-z]/, prefix: '!1' })
user.secretBook = faker.animal.bird()
user.username = faker.person.fullName()

invalidUser.email = faker.location.zipCode('####')
invalidUser.password = faker.internet.password({ length: 2, pattern: /[A-z]/ })
invalidUser.repeatPassword = faker.internet.password({ length: 3, pattern: /[A-z]/ })
invalidUser.secretBook = faker.animal.bird()
invalidUser.username = faker.person.fullName()

billingData.address = faker.location.secondaryAddress()
billingData.country = faker.location.country()
billingData.cardNumber = faker.finance.creditCardNumber('63[7-9]#############')
billingData.city = faker.location.city()
billingData.zip = faker.location.zipCode('####')
billingData.mobileNumber = faker.phone.number('1######-9########')
billingData.name = faker.person.fullName()
billingData.comment = faker.word.words({ count: { min: 5, max: 10 } })

invalidBillingData.address = faker.internet.email()
invalidBillingData.country = faker.location.zipCode('###')
invalidBillingData.cardNumber = faker.finance.creditCardNumber('###')
invalidBillingData.city = faker.finance.accountNumber(5)
invalidBillingData.zip = faker.word.words({ count: { min: 5, max: 10 } })
invalidBillingData.mobileNumber = faker.number.int(10)
invalidBillingData.name = faker.finance.creditCardCVV()
invalidBillingData.comment = faker.word.words({ count: { min: 5, max: 10 } })

it('1.1 Register user with invalid data', () => {
  cy.visit('/')

  cy.log('Close pop-ups')
  MainPage.closeWelcomePopUp().click();
  MainPage.closeCookiePopUp().click()

  MainPage.getAccountBtn().click()
  MainPage.getLoginBtn().click()
  loginPage.getNewCustomerLink().click()

  cy.log('Negative test')
  Registration.getEmailField().type(invalidUser.email)
  Registration.getPasswordField().type(invalidUser.password)
  Registration.getRepeatPasswordField().type(invalidUser.repeatPassword)
  Registration.getToggleBtn().click()
  Registration.getValidationEmailMessage().should('contain', 'not valid')
  Registration.getValidationPasswordMessage().should('contain', 'characters long.')
  Registration.getValidationRepeatPasswordMessage().should('contain', 'not match')

})

it('1.1 Register user with valid data', () => {
  cy.visit('/')

  cy.log('Close pop-ups')
  MainPage.closeWelcomePopUp().click();
  MainPage.closeCookiePopUp().click()

  MainPage.getAccountBtn().click()
  MainPage.getLoginBtn().click()
  loginPage.getNewCustomerLink().click()

  cy.log('Negative test')
  Registration.getEmailField().type(user.email)
  Registration.getPasswordField().type(user.password)
  Registration.getRepeatPasswordField().type(user.password)
  Registration.getToggleBtn().click()
  Registration.getSecretWordDropdown().click()
  Registration.getChooseSecretWord().click()
  Registration.getAnswerField().type(user.secretBook)
  Registration.getRegistrationBtn().click()
  Registration.getMessagePopUp().should('have.text', 'Registration completed successfully. You can now log in.')

})

it('1.2 Login with invalid data', () => {
  cy.visit('/')

  cy.log('Close pop-ups')
  MainPage.closeWelcomePopUp().click();
  MainPage.closeCookiePopUp().click()

  MainPage.getAccountBtn().click()
  MainPage.getLoginBtn().click()

  loginPage.getEmailField().type(invalidUser.email)
  loginPage.getPasswordField().type(invalidUser.password)
  loginPage.getRememberMe()
  loginPage.getLoginButton().click()
  loginPage.getValidationLoginMessage().should('contain', 'Invalid email or password.')


})

it('1.2 Login with valid data', () => {
  cy.visit('/')

  cy.log('Close pop-ups')
  MainPage.closeWelcomePopUp().click();
  MainPage.closeCookiePopUp().click()

  MainPage.getAccountBtn().click()
  MainPage.getLoginBtn().click()

  loginPage.getEmailField().type(user.email)
  loginPage.getPasswordField().type(user.password)
  loginPage.getRememberMe()
  loginPage.getLoginButton().click()

})

it('1.3 Buy a product with Valid and invalid billing data', () => {
  cy.visit('/')

  cy.log('Close pop-ups')
  MainPage.closeWelcomePopUp().click();
  MainPage.closeCookiePopUp().click()

  cy.log('Login')
  MainPage.getAccountBtn().click()
  MainPage.getLoginBtn().click()

  loginPage.getEmailField().type(user.email)
  loginPage.getPasswordField().type(user.password)
  loginPage.getRememberMe()
  loginPage.getLoginButton().click()

  cy.log('Find a product')
  findProduct(product.appleJuice)
  MainPage.getIntoBasketMessage().should('contain', `into basket.`)
  Basket.clickBasketBtn().click()

  cy.log('Add the invalid billing data')
  Checkout.getCheckoutBtn().click()
  Checkout.getNewAddressBtn().click()
  Checkout.getCountry().click()
  Checkout.getName().click()
  Checkout.getMobileNumber().type(invalidBillingData.mobileNumber)
  Checkout.getZip().type(invalidBillingData.zip)
  Checkout.getAddress().click()
  Checkout.getCity().click()
  Checkout.getState().type(invalidBillingData.state)
  cy.log('Check validation messages')
  Checkout.getCityMessage().should('contain', 'a city')
  Checkout.getAddressMessage().should('contain', 'an address')
  Checkout.getMobilePhoneMessage().should('contain', '-9999999999 format')
  Checkout.getNameMessage().should('contain', 'provide a name')
  Checkout.getCountryMessage().should('contain', 'provide a country')

  cy.log('Add valid billing data')
  Checkout.getCountry().type(billingData.country)
  Checkout.getName().type(user.username)
  Checkout.getMobileNumber().clear().type(billingData.mobileNumber)
  Checkout.getZip().clear().type(billingData.zip)
  Checkout.getAddress().type(billingData.address)
  Checkout.getCity().type(billingData.city)
  Checkout.getState().clear().type(billingData.state)
  Checkout.getSubmitBtn().click()

  cy.log('Product comfirmation page')
  Address.getAddress().should('contain', `${billingData.zip}`)
  Address.getRadioBtn().click()
  Address.getContinueBtn().click()
  Address.getMessagePopUp().should('contain', 'to your addresses')

  cy.log('Choose the delivery option')
  Delivery.getRadioBtnDelivery().click()
  Delivery.getContinueBtnDelivery().click()

  cy.log('Invalid card data')
  CardData.getAddNewCardBtn().click()
  CardData.getNameOnCard().click()
  CardData.getCardNumber().click()
  CardData.getExpireMonth()
  CardData.getNameMessage().should('contain', 'provide a name')
  CardData.getCardMessage().should('contain', 'your card number.')

  cy.log('enter a valid card numer data ')

  cy.log('Valid card data')
  CardData.getNameOnCard().clear().type(user.username)
  CardData.getCardNumber().clear().type(billingData.cardNumber)
  CardData.getExpireMonth()
  CardData.getExpireYear()
  CardData.getSubmitButton().click()
  CardData.getRadioButton().click()
  CardData.getMessagePopUp().should('contain', 'been saved for your convenience')
  OrderSummary.getProceedToReview().click()

  cy.log('Product purchase information')
  MainPage.getCktBtn().click()

  cy.log('Confirmation page')
  Confirm.getMessagePopUp().should('have.text', 'Thank you for your purchase!')

})

it('1.4 Find a product', () => {
  cy.visit('/')

  cy.log('Close pop-ups')
  MainPage.closeWelcomePopUp().click();
  MainPage.closeCookiePopUp().click()

  cy.log('Login')
  MainPage.getAccountBtn().click()
  MainPage.getLoginBtn().click()

  loginPage.getEmailField().type(user.email)
  loginPage.getPasswordField().type(user.password)
  loginPage.getRememberMe()
  loginPage.getLoginButton().click()

  cy.log('Find a product')
  findProduct(product.appleJuice)


})

it('1.5 Solve captcha', () => {
  cy.visit('/')

  cy.log('Close pop-ups')
  MainPage.closeWelcomePopUp().click();
  MainPage.closeCookiePopUp().click()

  MainPage.getAccountBtn().click()
  MainPage.getLoginBtn().click()

  loginPage.getEmailField().type(user.email)
  loginPage.getPasswordField().type(user.password)
  loginPage.getRememberMe()
  loginPage.getLoginButton().click()

  solveCaptcha()
  Captcha.getCommentField().type(`${billingData.comment}`)
  Captcha.getRaitingSlider()
    .trigger('mousedown', { button: 0, force: true })
    .trigger('mousemove', { clientX: 200, clientY: 0, force: true })
    .trigger('mouseup', { button: 0, force: true });
  Captcha.getReviewBtn().click()
  Captcha.getMessagePopUp().should('have.text', 'Thank you for your feedback.')

})