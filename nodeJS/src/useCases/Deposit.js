const { Transaction } = require('../domain/Transaction');

exports.Deposit = function Deposit (userBalanceRepository) {
  return {
    execute (amount, date) {
      userBalanceRepository.addTransaction(Transaction(amount, date));
    }
  };
};
