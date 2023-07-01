import math from 'mathjs';

export function evaluateEquation(expression) {
  const sanitizedExpression = expression.replace(/\s/g, '');
  const result = math.evaluate(sanitizedExpression);
  cy.log('Calculated CAPTCHA result:', result);
  return result.toString();
}