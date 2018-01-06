import React from 'react';
import ExpensesList from './ExpenseList';
import ExpensesListFilter from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesListFilter />
    <ExpensesList />
  </div>
);

export default ExpenseDashboardPage;
