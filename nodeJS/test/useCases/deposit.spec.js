const { Transaction } = require('../../src/domain/Transaction');
const { Deposit } = require('../../src/useCases/Deposit');

describe('User deposit use case', () => {
  it('Should add given amount to user balance', () => {
    const userBalanceRepository = {
      addTransaction: jest.fn()
    };
    const deposit = Deposit(userBalanceRepository);

    deposit.execute(1000, '10/01/2012');

    expect(userBalanceRepository.addTransaction).toHaveBeenCalledWith(Transaction(1000, '10/01/2012'));
  });
});
