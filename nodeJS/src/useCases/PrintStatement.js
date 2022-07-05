exports.PrintStatement = function PrintStatement (userBalanceRepository, balancePrinter) {
  return {
    execute () {
      const transactionsWithTotalAmount = addTotalAmountTo(userBalanceRepository.retrieveTransactions());
      balancePrinter.print(format(transactionsWithTotalAmount));
    }
  };

  function addTotalAmountTo (transactions) {
    let totalAmount = 0;
    const transactionsWithTotalAmount = [];

    for (const transaction of transactions) {
      totalAmount += transaction.amount;
      transactionsWithTotalAmount.push(
        TransactionWithTotalAmount(
          transaction,
          totalAmount,
          totalAmount
        )
      );
    }

    return transactionsWithTotalAmount;

    function TransactionWithTotalAmount ({ date, amount }, totalAmount) {
      return {
        date,
        amount,
        totalAmount
      };
    }
  }

  function format (transactions) {
    const balanceHeader = 'Date||Amount||Balance';
    const transactionsFormatted = transactions.map(({ date, amount, totalAmount }) => `${date}||${amount}||${totalAmount}`)
      .reverse()
      .join('\n');
    return `\n${balanceHeader}\n${transactionsFormatted}\n`;
  }
};
