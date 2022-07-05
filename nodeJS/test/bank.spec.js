
const { AccountService } = require('../src/AccountService');
const { Transaction } = require('../src/domain/Transaction');

describe('Bank', () => {
  it('Should print the expected balance after some movements', () => {
    const { balancePrinter, clock, userBalanceRepository } = givenSystemCollaborators();
    const accountService = AccountService(balancePrinter, userBalanceRepository, clock);

    accountService.deposit(1000);
    accountService.deposit(2000);
    accountService.withdraw(500);
    accountService.printStatement();

    thenBalanceShouldBePrintedAsExpected();

    function givenSystemCollaborators () {
      const balancePrinter = {
        print: jest.fn()
      };

      const dates = ['10/01/2012', '13/01/2012', '14/01/2012'];
      const clock = {
        currentDate: jest.fn(() => dates.pop())
      };

      const userBalanceRepository = {
        addTransaction: jest.fn(),
        retrieveTransactions: jest.fn(() => [
          Transaction(1000, '10/01/2012'),
          Transaction(2000, '13/01/2012'),
          Transaction(-500, '14/01/2012')
        ])
      };

      return {
        userBalanceRepository,
        clock,
        balancePrinter
      };
    }

    function thenBalanceShouldBePrintedAsExpected () {
      expect(balancePrinter.print).toBeCalledWith(`
Date||Amount||Balance
14/01/2012||-500||2500
13/01/2012||2000||3000
10/01/2012||1000||1000
`);
    }
  });
});
