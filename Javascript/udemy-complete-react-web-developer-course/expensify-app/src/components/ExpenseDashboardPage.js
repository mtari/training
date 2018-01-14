import React from 'react';
import ExpensesList from './ExpenseList';
import ExpensesListFilter from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />  
    <ExpensesListFilter />
    <ExpensesList />
  </div>
);

export default ExpenseDashboardPage;
