import IndexPageMovistar from '../../support/Pages/indexMovistar';


describe('Tests Ejercicios Movistar Propios ',function(){

    //Esta funcion la encontre investigando, 
    //me tiraba multiples veces errores al correr el test por el tema del JQuerry
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })

    beforeEach(function(){
        IndexPageMovistar.home();
    })

    afterEach(function(){
        cy.screenshot();
    })
    
    //Ejercicio 4
    it("Validar adicion correcta de equipo -Samsung Galaxy A03 Core al carrito de compras  ",function(){
        IndexPageMovistar.addItemToCart();
        cy.get('.message').invoke('text').should("eq","Añadiste Samsung Galaxy A03 Core a tu carrito de compras.");
    })

    it("Validar que se removio equipo del carrito de compras ",function(){
        IndexPageMovistar.addItemToCart();
        IndexPageMovistar.removeItem();
        cy.get('.cart-empty > :nth-child(1)').invoke('text').should("eq","No tienes ningún artículo en tu carrito de compras.");
    })

    it("Validar exceso de equipos en carrito de compra",function(){
        IndexPageMovistar.addItemToCart();
        IndexPageMovistar.home();
        IndexPageMovistar.addAnotherItemToCart();
        cy.get('.message').invoke('text').should("eq","No podés agregar este producto a tu carrito de compras. Recordá que solo podés llevarte un producto por compra.");
    })
})