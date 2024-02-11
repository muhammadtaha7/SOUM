import "../support/commands";

const randomZipCodeNumber = Math.floor(100000 + Math.random() * 900000);

describe("Soum Technical Test", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("Successfull Login", () => {
    cy.Login();
    cy.wait(1500);
    cy.get(".app_logo").should("be.visible");
  });
  it("Unsuccessfull Login", () => {
    cy.UnsuccessfullLogin();
    cy.wait(1500);
    cy.get('[data-test="error"]').should("be.visible");
  });

  it("Add an item to cart", () => {
    cy.Login();
    cy.wait(1500);
    cy.get(".app_logo").should("be.visible");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
  });
  it("Remove an item from the cart", () => {
    cy.Login();
    cy.wait(1500);
    cy.get(".app_logo").should("be.visible");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get(".cart_item").should("not.exist"); // Assert item is removed
  });

  it("Checkout an item from the cart", () => {
    cy.Login();
    cy.wait(1500);
    cy.get(".app_logo").should("be.visible");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.get(".title").should("have.text", "Checkout: Your Information");
    cy.get('[data-test="firstName"]').type("Jane Test");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type(randomZipCodeNumber);
    cy.get('[data-test="continue"]').click();
    cy.get(".title").should("have.text", "Checkout: Overview");
    cy.get('[data-test="finish"]').click();
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
  });
  it("Add and checkout multiple items from the cart", () => {
    cy.Login();
    cy.wait(1500);
    cy.get(".app_logo").should("be.visible");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.get(".title").should("have.text", "Checkout: Your Information");
    cy.get('[data-test="firstName"]').type("Jane Test");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type(randomZipCodeNumber);
    cy.get('[data-test="continue"]').click();
    cy.get(".title").should("have.text", "Checkout: Overview");
    cy.get('[data-test="finish"]').click();
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
  });

  it("Add multiples items in cart and remove an item from checkout", () => {
    cy.Login();
    cy.wait(1500);
    cy.get(".app_logo").should("be.visible");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get(".title").should("have.text", "Checkout: Your Information");
    cy.get('[data-test="firstName"]').type("Jane Test");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type(randomZipCodeNumber);
    cy.get('[data-test="continue"]').click();
    cy.get(".title").should("have.text", "Checkout: Overview");
    cy.get('[data-test="finish"]').click();
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
  });
});
