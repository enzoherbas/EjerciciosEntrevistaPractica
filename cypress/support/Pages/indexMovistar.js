
class IndexPageMovistar{

    home = () => {
        cy.fixture('elementsMovistar.json').then((elements)=>{
            cy.visit(elements.url)
        })
    }

    search = (searchName) => {

        cy.fixture('elementsMovistar.json').then((elements)=>{

            cy.get(elements.searchButtonId).click()
            cy.get(elements.searchBoxId).type(searchName)
            cy.get(elements.search).click()
        })
    }

    selectFilter = (element) =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{   
            cy.get(elements.filtersMenuId).click()
        })
        cy.get(element).click()
        cy.wait(2500)
    }

    filterByPrice = () =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{            
            this.selectFilter(elements.filterPrice100_200k)
        })
    }

    filterByMemory = () =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{            
            this.selectFilter(elements.filterMemory256)
        })
    }

    selectAnItemFromTheProductList = (index) =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{
            cy.get(elements.productListClass).children().eq(index).click()
        })
    }

    selectTheThirdElement = () => {
        this.selectAnItemFromTheProductList(2);
    }

    selectTheFirstElement = () => {
        this.selectAnItemFromTheProductList(1);
    }

    buy = () =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{
            cy.get(elements.buyButtonId).click();
        })
    }

    addItemToCart = () =>{
        this.selectTheFirstElement();
        this.buy();
    }

    addAnotherItemToCart = () =>{
        this.selectTheThirdElement();
        this.buy();
    }

    removeItem = () =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{
            cy.get(elements.removeButtonId).click();
        })
    }

    assertThatItContainsAModel = (model) => {
        cy.fixture('elementsMovistar.json').then((elements)=>{
            cy.get(elements.productListClass).contains(model).click()
        })
    }

    assertThatThereAreANumberOfInstallments = (numberOfInstallments) =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{
            this.assertThatElementContainsTheText(elements.installmentsTextId,numberOfInstallments)
        })
    }

    assertNumberOfDevices = () =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{

            cy.get(elements.productListClass).children().then((childrens) => {
                cy.log('La cantidad de equipos para esta busqueda es de ' + childrens.length)
                this.assertThatElementContainsTheText(elements.toolbarNumberClass,childrens.length)
            })
        })
        }

    assertThatElementContainsTheText = (element, text) =>{
        cy.get(element).invoke('text').then((textContaining) => {
            expect(textContaining).to.include(text)
        })

    }

    filterInstalmentsByBankAndCardType = (bank, type) =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{

            cy.get(elements.installmentsMenuId).click()
            cy.get(elements.bankSelectorId).select(bank)
            cy.get(elements.cardBankSelectorId).select(type)
        })
    }

    assertThatThereAreNot60Instalments = () =>{
        cy.fixture('elementsMovistar.json').then((elements)=>{

            cy.get(elements.installmentTableId).children().then((values) => {
                cy.log('La cantidad de opciones en cuotas es de ' + values.length)
                for (let index = 1; index <= values.length; index++) {
                    cy.get('#bodyTable > :nth-child(' + index + ') > :nth-child(1)').invoke('text').should('not.contains',60)
                }
            })
        })
        cy.log('No hay opcion de 60 cuotas con el banco Credicoop y tarjeta Visa')
    }

    

}

export default new IndexPageMovistar();