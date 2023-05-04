
/// <reference types="Cypress" />

    describe('Central de Atendimento ao Cliente TAT', function() {

    const tres_segundos=3000

    beforeEach (function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should("be.equal","Central de Atendimento ao Cliente TAT")
    })

    it('preenche os campos obrigatorios e envia o formulario', function(){
        const longtext = "teste,teste,teste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,testeteste,teste"
        cy.clock()
        cy.get('#firstName').type("Alisson")
        cy.get('#lastName').type("Macedo")
        cy.get('#email').type("teste123@gmail.com")
        cy.get('#phone').type("11977343222")
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.contains("button", "Enviar").click()
        cy.get('.success').should("be.visible")
        cy.tick(tres_segundos)
        cy.get('.success').should("be.not.visible")
    })

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').type("Alisson")
        cy.get('#lastName').type("Macedo")
        cy.get('#email').type("teste123,com")
        cy.get('#phone').type("11977343222")
        cy.get('#open-text-area').type("longtext")
        cy.contains("button", "Enviar").click()
        cy.get('.error').should("be.visible")
        cy.tick(tres_segundos)
        cy.get('.error').should("be.not.visible")
    })
    it('Campo telefone continua vazio quando preenchido com um valor não numerico', function(){
        cy.get('#phone')
        .type("ABC")
        .should("have.value","")
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()
        cy.get('#firstName').type("Alisson")
        cy.get('#lastName').type("Macedo")
        cy.get('#email').type("teste123,com")
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("longtext")
        cy.contains("button", "Enviar").click()
        cy.get('.error').should("be.visible")
        cy.tick(tres_segundos)
        cy.get('.error').should("be.not.visible")
        
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type("Alisson")
        .should("have.value","Alisson")
        .clear()
        .should("have.value","")
        cy.get('#lastName')
        .type("Macedo")
        .should("have.value","Macedo")
        .clear()
        .should("have.value","")
        cy.get('#email')
        .type("teste123@gmailcom")
        .should("have.value","teste123@gmailcom")
        .clear()
        .should("have.value","")
        cy.get('#phone').type("11977343222")
        .should("have.value","11977343222")
        .clear()
        .should("have.value","")
        cy.get('#open-text-area')
        .type("longtext")
        .should("have.value","longtext")
        .clear()
        .should("have.value","")
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){
        cy.clock()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should("be.visible")
        cy.tick(tres_segundos)
        cy.get('.error').should("be.not.visible")
    })

    it('envia um formulario usando comando customizado.', function(){
        cy.clock()
       cy.fillMandatoryFieldsAndSubmit("Alisson","Macedo","Alissonamsa@gmail.com","1198382323","TESTE")
       cy.get('.success').should("be.visible")
       cy.tick(tres_segundos)
       cy.get('.success').should("be.not.visible")
    })

    
    it('Seleciona um produto (Youtube) por seu texto.', function(){
        cy.get('#product')
        .select("youtube")
        .should("have.value","youtube")
         
     })

     it('Seleciona um produto (Mentoria) por seu value.', function(){
        cy.get('#product')
        .select("mentoria")
        .should("have.value","mentoria") 
     })

     it('Seleciona um produto (Blog) por seu indice.', function(){
        cy.get('#product')
        .select(1)
        .should("have.value","blog")
     })

     it('marca o tipo de atendimento "Feedback', function(){
        cy.get('input[type="radio"][value ="feedback"]').check()
        .should('have.value',"feedback")
     })

     it('marca cada tipo de atendimento"', function(){
        cy.get('input[type="radio"]')
        .should("have.length",3)
        .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should("be.checked")
        })
     })
     
     it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
     })

     it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should("not.have.value")
        .selectFile("./cypress/fixtures/example.json")
        .should(function($input){
            console,console.log($input);
            expect($input[0].files[0].name).to.equal("example.json")
        })
     })
     it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]#file-upload')
        .should("not.have.value")
        .selectFile("./cypress/fixtures/example.json",{action:"drag-drop"})
        .should(function($input){
            console,console.log($input);
            expect($input[0].files[0].name).to.equal("example.json")
        })
     })
     it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
            cy.fixture("example.json").as("sampleFile")
            cy.get('input[type="file"]#file-upload')
            .selectFile("@sampleFile")
            .should(function($input){
                console,console.log($input);
                expect($input[0].files[0].name).to.equal("example.json")
         })
     })
     it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get("#privacy a").should("have.attr","target", "_blank").click
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke("removeAttr","target")
        .click()
        cy.contains("Talking About Testing").should("be.visible")
    })
    it('preenche a area de texto usando o comando invoke', function(){
        const longtext = Cypress._.repeat("1234567",20)
        cy.get("#open-text-area")
        .invoke("val",longtext)
        .should("have.value" ,longtext)
     })
     it.only('faz uma requisição HTTP', function(){
       cy.request("https://cac-tat.s3.eu-central-1.amazonaws.com/index.html")
       .should(function(response){
            const{status,statusText,body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal("OK")
            expect(body).to.include("CAC TAT")
         })
     })
  })