describe('store-ui-shared: Header component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=header--primary&args=title:BoardGameHoard'));
    
    it('should render the component', () => {
      cy.get('h6').should('contain', 'BoardGameHoard');
    });
});
