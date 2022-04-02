import IndexPageMovistar from '../../support/Pages/indexMovistar';

describe('Tests Ejercicios Movistar', function () {
    
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

    //Ejercicio 1
    it("Validar cuotas en compra de equipo -Cuotas.12 -Equipo.A52", function () {

        IndexPageMovistar.search('A52');
        IndexPageMovistar.assertThatItContainsAModel('Samsung Galaxy A52');
        IndexPageMovistar.assertThatThereAreANumberOfInstallments('12 cuotas');
        
    })
    
    //Ejercicio 2
    it("Aplicar filtro de equipos -Gama.Alta -Memoria Interna.256GB", function () {

        IndexPageMovistar.filterByPrice();
        IndexPageMovistar.filterByMemory();
        IndexPageMovistar.assertNumberOfDevices();

    })

    //Ejercicio 3
    it("Validar cuotas -Cuotas.60 -Equipo Tercero de la lista -Banco Credicoop -Tarjeta Visa", function () {

        IndexPageMovistar.selectTheThirdElement();
        IndexPageMovistar.filterInstalmentsByBankAndCardType('Credicoop','Visa');
        IndexPageMovistar.assertThatThereAreNot60Instalments();
    })

})