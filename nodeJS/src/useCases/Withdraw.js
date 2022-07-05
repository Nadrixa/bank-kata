const { Transaction } = require('../domain/Transaction');

exports.Withdraw = function Withdraw (userBalanceRepository) {
  return {
    execute (amount, date) {
      userBalanceRepository.addTransaction(Transaction(-1 * amount, date));
    }
  };
};
