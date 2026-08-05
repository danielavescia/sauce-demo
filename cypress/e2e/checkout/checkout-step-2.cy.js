const { checkoutS2Elements } = require("../../support/pages/checkout-s2.elements");
import { calculateTotal } from '../../support/helpers/helper'

describe('Checkout Step 2 - Order Review', () => {
    
    const USER_DETAILS = {
        firstName: 'Standard', 
        lastName: 'User', 
        postalCode: '12345'
    };

    let users;
    let product;

    before(() => {
        cy.fixture('users').then((usersData) => {
            users = usersData;
        });
        cy.fixture('products').then((productsData)=> {
            product = productsData.backpack;
        });
    });

    beforeEach(()=> {
       cy.login({username: users.standard.username,password: users.standard.password});
       cy.goToCheckoutStepTwo(USER_DETAILS, product);
    });

    context('when acessing the review step', () => {

        it('should display selected products with name, description, quantity and price correctly', () => {
            cy.get(checkoutS2Elements.product).within(() => {
                cy.get(checkoutS2Elements.productName).should('have.text', product.name);
                                        
                cy.get(checkoutS2Elements.productDescription).should('have.text', product.description);
                    
                cy.get(checkoutS2Elements.productPrice).should('have.text', product.price);

                cy.get(checkoutS2Elements.productQnt).should('have.text', '1');                        
            });     
        });

        it('item total should match the sum of products price', () => {
            cy.get(checkoutS2Elements.subtotal).should('contain', product.price);
        });

        it('total should equal item total plus tax', () => {
            cy.get(checkoutS2Elements.total).should('contain', calculateTotal(product.price));
        });

        it('should complete purchase and redirect to confirmation page', () => {
            cy.get(checkoutS2Elements.finishButton).click();
            cy.url().should('contain', '/checkout-complete.html')
            cy.get('[data-test="complete-header"]').should('have.text', "Thank you for your order!")
        });
    })
});