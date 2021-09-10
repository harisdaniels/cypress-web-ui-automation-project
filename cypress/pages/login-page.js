/// <reference types="cypress" />

class Login {

    /*
    visitWebsite() {
        cy.visit("https://admin-demo.nopcommerce.com/");

        return this;
    }
    */

    fillEmail(email) {
        const emailField = cy.get("#Email");
        emailField.clear();
        emailField.type(email);

        return this;
    }

    fillPassword(password) {
        const passwordField = cy.get("#Password");
        passwordField.clear();
        passwordField.type(password);

        return this;
    }

    clickRememberMeCheckBox() {
        const rememberMeCheckBox = cy.get("input[type='checkbox']");
        rememberMeCheckBox.click();

        return this;
    }

    clickLoginButton() {
        const loginButton = cy.get("button[type='submit']");
        loginButton.click();

        return this;
    }

}

const login = new Login();
module.exports = login;