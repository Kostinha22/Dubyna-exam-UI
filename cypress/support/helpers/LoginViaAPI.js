///<reference types="cypress"/>

let sessionData = { email: "", token: "" };

export function loginViaAPI(user) {
    cy.log('Login');
  
    let requestBody = {
      email: "",
      password: ""
    };
    
    requestBody.email = user.email;
    requestBody.password = user.password;
  
    let sessionData = { email: "", token: "" }; // Declare and initialize sessionData variable with email and token properties
  
    cy.request('POST', '/rest/user/login', requestBody).then(response => {
      expect(response.isOkStatusCode).to.be.true;
  
      let token = response.body.authentication.token;
      
      sessionData.email = user.email;
      sessionData.token = token;
      cy.setCookie('token', token);
  
      window.localStorage.setItem('email', sessionData.email);
      window.localStorage.setItem('token', sessionData.token);
    });
  }
  
  
  