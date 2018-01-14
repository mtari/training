const selectExpensesTotal = (expenses = undefined) => {
    if(expenses) {
        return expenses
            .map((expense) => expense.amount)
            .reduce((sum, value) => sum + value, 0);
    }
    return 0;
}

export default selectExpensesTotal;