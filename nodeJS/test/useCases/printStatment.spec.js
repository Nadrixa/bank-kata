const { Transaction } = require('../../src/domain/Transaction');
const { PrintStatement } = require('../../src/useCases/PrintStatement');

describe('Print statement use case', () => {
  it('Should print user transaction in the expected format', () => {
    const userBalanceRepository = {
      retrieveTransactions: jest.fn(() => [
        Transaction(1000, '10/01/2012'),
        Transaction(500, '11/01/2012')
      ])
    };

    const balancePrinter = {
      print: jest.fn()
    };

    const printStatement = PrintStatement(userBalanceRepository, balancePrinter);

    printStatement.execute();

    expect(userBalanceRepository.retrieveTransactions).toHaveBeenCalled();
    expect(balancePrinter.print).toHaveBeenCalledWith(`
Date||Amount||Balance
11/01/2012||500||1500
10/01/2012||1000||1000
`);
  });
});
