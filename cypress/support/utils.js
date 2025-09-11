export function validateSortOrder(order) {
    // Pega todos os elementos de preço na página
    cy.get('.inventory_item_price').then(prices => {
      // Extrai o valor numérico de cada preço, removendo o '$'
      const priceValues = [...prices].map(price => parseFloat(price.innerText.replace('$', '')));
  
      let sortedPrices;
  
      // Define a lógica de ordenação com base no parâmetro 'order'
      if (order === 'low to high') {
        sortedPrices = [...priceValues].sort((a, b) => a - b);
      } else if (order === 'high to low') {
        sortedPrices = [...priceValues].sort((a, b) => b - a);
      } else {
        // Opcional: trate o caso de uma ordem inválida para evitar falha
        throw new Error(`Ordem de filtro inválida: ${order}`);
      }
  
      // Compara a lista atual com a lista ordenada
      expect(priceValues).to.deep.equal(sortedPrices);
    });
  }