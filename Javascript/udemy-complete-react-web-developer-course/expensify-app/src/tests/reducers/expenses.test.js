import expensesReducer from './../../reducers/expenses';
import expenses from './../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by ID', () => {
    const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if ID not found', () => {
    const action = { type: 'REMOVE_EXPENSE', id: 'testID' };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test('should add an expense', () => {
    const expense = {
        id: '109',
        description: 'Laptop',
        note: '',
        createdAt: 20000,
        amount: 29500
    }
    const action = { type: 'ADD_EXPENSE', expense };
    const state = expensesReducer(expenses, action);
    expect(state.length).toBe(4);
    expect(state).toEqual([...expenses, expense]);
});

test('should edit expense by ID', () => {
    const description = 'test';
    const action = { type: 'EDIT_EXPENSE', id: expenses[1].id, updates: { description } };
    const state = expensesReducer(expenses, action);
    expect(state[1].description).toEqual(description);
});

test('should not edit expense if ID not found', () => {
    const description = 'test';
    const action = { type: 'EDIT_EXPENSE', id: 'testID', updates: { description } };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const action = { type: 'SET_EXPENSES', expenses };
    const state = expensesReducer(expenses, action);
    expect(state.length).toBe(3);
    expect(state).toEqual([...expenses]);
});