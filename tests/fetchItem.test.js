require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  //fail('Teste vazio');
  it('Verifica se _fetchItem _ é uma função', async () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('Verifica se dado um argumento para _fetchItem _ a função fetch é chamada', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se dado um argumento para _fetchItem _ o _endpoint_ está correto', async () => {
    const response = await fetchItem('MLB1615760527');
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Verifica se dado um argumento para _fetchItem _ o retorno é um objeto igual a _item_', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });

  it('Verifica se ao chamar a função _fetchItem _  sem argumentos a resposta é um erro', async () => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'));
  });


});
