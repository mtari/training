jest.autoMockOff();

import { addExpense, editExpense, removeExpense } from './../../actions/expenses';

test('Should setup remove expense action object', () => {
    const action = removeExpense({id: 'testID'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'testID'
    });
});

test('Should edit the expense', () => {
    const action = editExpense('testID', {note: 'Test note.'});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: 'testID',
        updates: {
            note: 'Test note.'
        }
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    })
});