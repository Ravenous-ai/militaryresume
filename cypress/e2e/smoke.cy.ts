describe("smoke tests", () => {
  it("should allow you to register and login", () => {
    cy.visitAndCheck("/");
    cy.findByText(
      /An AI assistant that helps you write Air Force narrative style bullets/i
    );
  });
});
