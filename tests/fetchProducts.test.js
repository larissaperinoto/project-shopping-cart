require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  //fail('Teste vazio');
  it('Verifica se _fetchProducts_ é uma função', async () => {
    const response = await fetchProducts;
    expect(typeof response).toEqual('function');
  });

  it('Verifica se ao chamar a função _fetchProducts_ com o argumento _computador_ a função _fetch_ está sendo chamada', async () => {
    const response = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função _fetchProducts_ com o argumento _computador_ há a resposta esperado', async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Verifica se ao chamar a função _fetchProducts_ a estrutura da resposta está correta', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });

  it('Verifica se ao chamar a função _fetchProducts_ sem argumentos a resposta é um erro', async () => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  });
});
