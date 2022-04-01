class IndexPageMovistar{


    home = () => {
        cy.visit("https://tienda.movistar.com.ar")
    }

    search = (searchName) => {
        cy.get('#search_mini_form > .actions').click()
        cy.get('#search').type(searchName).click()
        cy.get('.action.search').click()
    }

    selectFilter = (element) =>{
        cy.get('#layered-filter-block > .block-title > strong').click()
        cy.get(element).click()
    }

    filterByPrice = () =>{
        this.selectFilter('[attribute="price"] > .filter-options-content > .items > :nth-child(2) > a')
    }

    filterByMemory = () =>{
        this.selectFilter('[attribute="movistar_internalmemory"] > .filter-options-content > .items > :nth-child(2) > a')
    }

    selectTheThirdElement = () => {
        cy.get(".products.list.items.product-items").children().eq(2).click()
    }

    assertThatItContainsAModel = (model) => {
        cy.get('.products.list.items.product-items').contains(model).click()
    }

    assertThatThereAreANumberOfInstallments = (numberOfInstallments) =>{
        cy.get('#movistar-buy-options-wrapper > .active').contains(numberOfInstallments)
    }

    assertNumberOfDevices = () =>{
        cy.get('.list.items.product-items').children().then((childrens) => {
            cy.log('La cantidad de equipos para esta busqueda es de ' + childrens.length)
            cy.get('.toolbar-number').contains(childrens.lenght)
        })
    }

    filterInstalmentsByBankAndCardType = (bank, type) =>{
        cy.get('#open-installments-modal').click()
        cy.get('#selectBank').select(bank)
        cy.get('#selectCardByBank').select(type)
    }

    assertThatThereAreNot60Instalments = () =>{
        cy.get('#bodyTable').children().then((values) => {
            cy.log('La cantidad de opciones en cuotas es de ' + values.length)
            for (let index = 1; index <= values.length; index++) {
                cy.get('#bodyTable > :nth-child(' + index + ') > :nth-child(1)').contains('60').should('not.exist')
            }
        })

        cy.log('No hay opcion de 60 cuotas con el banco Credicoop y tarjeta Visa')
    }

    

}

export default new IndexPageMovistar();