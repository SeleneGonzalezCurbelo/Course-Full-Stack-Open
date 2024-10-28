describe('Blog app', function() {
  beforeEach(function() {
    // Visita la página antes de cada prueba
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function() {
    // Haz clic en el botón que muestra el formulario de inicio de sesión
    cy.contains('Show Login').click()
    // Verifica que el formulario de inicio de sesión sea visible
    cy.get('#loginForm').should('be.visible'); // Verifica que el formulario esté visible

    // Ahora verifica que el botón de inicio de sesión también sea visible
    cy.get('#login').should('be.visible'); // Verifica que el botón de inicio de sesión sea visible
  });
});
