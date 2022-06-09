const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  //fail('Teste vazio');

  it('Testa se ao executar _saveCartItems_ com um argumento o método _localStorage.setItem_ é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Testa se ao executar _saveCartItems_ com um argumento o método _localStorage.setItem_ é chamado com os argumentos', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    const param1 = 'cartItems';
    const param2 = '<ol><li>Item</li></ol>;'
    expect(localStorage.setItem).toHaveBeenLastCalledWith(param1, param2);
  });

});
