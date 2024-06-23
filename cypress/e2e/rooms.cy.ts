import { AvailabilityStatus } from '../../src/types/room';

describe('room list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it('display elements in default state', () => {
        cy.get('[data-test="room-item"]').should('have.length', 4);

        cy.get('[data-test=book-button]').should('be.disabled');

        cy.get('[data-test=availability-check-button]').should('not.be.disabled');

        cy.get('[data-test=checked-price]').should('not.exist');

        cy.get('[data-test=availability-status]').should('not.exist');
    });

    it('should check availability', () => {
        cy.get('[data-test="room-item"]').each((roomItem) => {
            cy.wrap(roomItem).as('roomElement');

            cy.get('@roomElement').within(() => {
                cy.intercept('GET', '**/room/*').as('availability-request');

                cy.get('[data-test=book-button]')
                    .should('be.disabled')
                    .get('[data-test=availability-check-button]')
                    .click()
                    .wait('@availability-request')
                    .its('response.body')
                    .then((response) => {
                        const availabilityResponse = JSON.parse(response);

                        if (availabilityResponse.availabilityStatus === AvailabilityStatus.Available) {
                            cy.get('[data-test=book-button]').should('not.be.disabled').get('[data-test=checked-price]').should('exist');
                        }
                    });
            });
        });
    });
});
