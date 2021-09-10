/// <reference types="cypress" />

const login = require("../../pages/login-page");
const dashboard = require("../../pages/dashboard-page");
const customerList = require("../../pages/customer-list-page");
const addCustomer = require("../../pages/add-new-customer-page");

const generate = require("../../pages/utils/generate");

describe("Test Suite for admin nopCommerce", function() {

    before(function() {
        cy.visit("https://admin-demo.nopcommerce.com/");
    });

    beforeEach(function() {
        cy.fixture("data.json").then(function(data) {
            this.data = data;
        });
    });

    // Logout from the website
    after(function() {
        //cy.get("#navbarText > ul > li:nth-child(3) > a").click({force:true});
        cy.get(".navbar-nav > :nth-child(3) > .nav-link").click();
    });


    it("It should success to run all the functionality", function() {
        // Login and Navigate to the Dashboard Page
        login.fillEmail(this.data.email);
        login.fillPassword(this.data.password);
        login.clickRememberMeCheckBox();
        login.clickLoginButton();
        cy.title().should('eq', "Dashboard / nopCommerce administration");

        // Navigate to Customer List Page
        dashboard.clickNopSideBarPusher();
        dashboard.clickCustomersDropDown();
        dashboard.clickCustomersLink();
        cy.title().should('eq', "Customers / nopCommerce administration");

        // Navigate to Add New Customer Page
        customerList.clickAddNewCustomerButton();
        cy.title().should('eq', "Add a new customer / nopCommerce administration");

        // Add New Customer
        let email = generate.generateEmail();
        addCustomer.inputEmail(email);
        addCustomer.inputPassword("test123");
        addCustomer.inputFirstName("Otong");
        addCustomer.inputLastName("Surotong");
        addCustomer.chooseGender("mAlE");
        addCustomer.inputDOB("1/1/1970");
        addCustomer.inputCompanyName("Si Tampan Otong Inc Ltd");
        addCustomer.clicktaxExempt();
        addCustomer.selectCustomerRole("GuEstS");
        addCustomer.selectNewsLetter("tesT stOre 2");
        addCustomer.selectVendor("veNdOr 1");
        addCustomer.inputAdminComment("This is for testing");
        addCustomer.clickSaveButton();
        cy.get(".alert").should('contain', "The new customer has been added successfully.");

        // Search Customer in Customer List Page By Email
        customerList.searchByEmail("brenda_lindgren@nopCommerce.com");
        customerList.clickSearchCustomerButton();
        let status = customerList.searchCustomerByEmail("brenda_lindgren@nopCommerce.com");
        cy.log(status);        
        expect(status).to.be.true;
        assert.equal(status, true);

        cy.wait(5000);
        cy.reload();

        // Search Customer in Customer List Page By Name
        customerList.searchByFirstName("Arthur");
        customerList.searchByLastName("Holmes");
        customerList.clickSearchCustomerButton();
        let statusCheck = customerList.searchCustomerByName("Arthur", "Holmes");
        cy.log(statusCheck);
        expect(statusCheck).to.be.true;
        assert.equal(statusCheck, true);

        cy.wait(3000);
    });

})