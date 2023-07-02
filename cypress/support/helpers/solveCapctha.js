import * as math from 'mathjs';

export function solveCaptcha() {
  cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/');
  cy.get('[aria-label="Open Sidenav"]').click()
  cy.get('[aria-label="Go to contact us page"]').click()

  cy.wait(10000);
  cy.get('#captcha')
    .invoke('text')
    .then(expression => {
      if (expression.trim() !== '') {
        const result = evaluateEquation(expression);
        cy.get('[placeholder="Please enter the result of the CAPTCHA."]')
          .clear()
          .type(result)
          .then(() => {
            cy.log('Entered CAPTCHA result:', result);

            // Проверка правильности результата в поле
            cy.get('[placeholder="Please enter the result of the CAPTCHA."]')
              .should('have.value', result);
          });
      } else {
        console.error('Received an empty string for CAPTCHA expression');
      }
    });

  function evaluateEquation(expression) {
    const sanitizedExpression = expression.replace(/\s/g, '');
    const result = math.evaluate(sanitizedExpression);
    cy.log('Calculated CAPTCHA result:', result);
    return result.toString();
  }
  }
  
  