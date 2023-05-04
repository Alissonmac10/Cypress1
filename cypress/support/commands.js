Cypress.Commands.add("fillMandatoryFieldsAndSubmit",function(nome,sobrenome,email,telefone,text){

    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#phone').type(telefone)
    cy.get('#open-text-area').type(text)
    cy.contains("button", "Enviar").click()


})