const { Deposit } = require('./useCases/Deposit');
const { PrintStatement } = require('./useCases/PrintStatement');
const { Withdraw } = require('./useCases/Withdraw');

exports.AccountService = function AccountService (balancePrinter, userBalanceRepository, clockService) {
  const deposit = Deposit(userBalanceRepository);
  const withdraw = Withdraw(userBalanceRepository);
  const printStatement = PrintStatement(userBalanceRepository, balancePrinter);

  return {
    deposit (amount) {
      deposit.execute(amount, clockService.currentDate());
    },
    withdraw (amount) {
      withdraw.execute(amount, clockService.currentDate());
    },
    printStatement () {
      printStatement.execute();
    }
  };
};
