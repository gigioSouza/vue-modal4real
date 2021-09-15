describe('vue-modal4real Plugin', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('SimpleModal', () => {
    it('should open SimpleModal', () => {
      cy.get('.openSimpleModal').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 1);

      cy.get('.modalContainer .modalContent .card h1')
        .should('have.text', 'SimpleModal');
    });

    it('should close SimpleModal when clicking in backdrop', () => {
      cy.on('uncaught:exception', () => false);

      cy.get('.openSimpleModal').click();

      cy.get('.modalContainer')
        .click('top');

      cy.get('.modalContainer .modalContent')
        .should('not.exist');
    });
  });

  describe('Nested Modals', () => {
    it('should open NestedModal2 from NestedModal1', () => {
      cy.get('.openNestedModal1').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 1);

      cy.get('.modalContainer .modalContent .card h1')
        .should('have.text', 'NestedModal1');

      cy.get('.modalContainer .modalContent .card .openNestedModal2').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 2);

      cy.get('.modalContainer .modalContent .card h1')
        .eq(1)
        .should('have.text', 'NestedModal2');
    });

    it('should close NestedModal2 and cascade NestedModal1', () => {
      cy.get('.openNestedModal1').click();

      cy.get('.modalContainer .modalContent .card .openNestedModal2').click();

      cy.get('.modalContainer .modalContent .card .resolveNestedModal2').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 0);
    });

    it('should close NestedModal2 and cascade NestedModal1', () => {
      cy.get('.openNestedModal1').click();

      cy.get('.modalContainer .modalContent .card .openNestedModal2').click();

      cy.get('.modalContainer .modalContent .card .resolveNestedModal2').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 0);
    });

    it('should open NestedModal1 from NestedModal2', () => {
      cy.get('.openNestedModal1').click();

      cy.get('.modalContainer .modalContent .card .openNestedModal2').click();

      cy.get('.modalContainer .modalContent .card .openNestedModal1').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 3);

      cy.get('.modalContainer .modalContent .card h1')
        .eq(2)
        .should('have.text', 'NestedModal1');
    });
  });

  describe('PropsModal', () => {
    it('should set props into PropsModal', () => {
      cy.get('#text').type('awesome');

      cy.get('.openPropsModal').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 1);

      cy.get('.modalContainer .modalContent .card h1')
        .should('have.text', 'PropsModal awesome');
    });
  });

  describe('ResolveRejectModal', () => {
    it('should reject ModalWrapper promise on reject', (done) => {
      cy.on('uncaught:exception', () => {
        done();
        return false;
      });

      cy.get('.openResolveRejectModal').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 1);

      cy.get('.modalContainer .modalContent .card h1')
        .should('have.text', 'ResolveRejectModal');

      cy.get('.modalContainer .modalContent .card #reject').click();
    });

    it('should ressolve ModalWrapper promise on resolve', () => {
      cy.get('.openResolveRejectModal').click();

      cy.get('.modalContainer .modalContent')
        .should('have.length', 1);

      cy.get('.modalContainer .modalContent .card h1')
        .should('have.text', 'ResolveRejectModal');

      cy.get('.modalContainer .modalContent .card #resolve').click();
    });
  });
});
