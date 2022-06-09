const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  //fail('Teste vazio');
  it('Testa se, ao executar _getSavedCartItems_, o método _localStorage.getItem_ é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Testa se ao executar _getSavedCartItems_, o método _localStorage.getItem_ é chamado com os parametros', () => {
    getSavedCartItems();
    const param1 = 'cartItems';
    expect(localStorage.getItem).toHaveBeenLastCalledWith(param1);
  });

});
