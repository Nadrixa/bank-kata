const { Withdraw } = require('../../src/useCases/Withdraw');
const { Transaction } = require('../../src/domain/Transaction');

describe('User withdraw use case', () => {
  it('Should subtract given amount to user balance', () => {
    const userBalanceRepository = {
      addTransaction: jest.fn()
    };
    const withdraw = Withdraw(userBalanceRepository);

    withdraw.execute(1000, '10/01/2012');

    expect(userBalanceRepository.addTransaction).toHaveBeenCalledWith(Transaction(-1000, '10/01/2012'));
  });
});
