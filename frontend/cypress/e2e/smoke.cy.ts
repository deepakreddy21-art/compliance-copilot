describe('Compliance Copilot Smoke Test', () => {
  it('loads the homepage and shows the scan form', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Scan a GitHub Repo for PII');
    cy.get('input[placeholder*="GitHub Repo URL"]').should('exist');
  });
}); 