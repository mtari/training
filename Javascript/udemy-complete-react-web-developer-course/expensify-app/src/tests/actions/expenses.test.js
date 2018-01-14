jest.autoMockOff();

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    addExpense,
    startAddExpense,
    editExpense, 
    startEditExpense,
    removeExpense, 
    startRemoveExpense,
    setExpenses,
    startSetExpenses } from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import database from './../../firebase/firebase';

const uid = 'testUID';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => {
        done();
    });
});

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
    const expenseData = expenses[2];
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'Better mouse',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense  with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expensedefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                note: '',
                amount: 0,
                createdAt: 0
            }
        });
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expensedefaults);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should remove expense from firebase', (done) => {
    const id = expenses[0].id;
    const store = createMockStore(defaultAuthState);
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should edit expense in firebase', (done) => {
    const id = expenses[0].id;
    const updates = {
        description: 'updated description',
        note: 'this is a updated note',
        amount: 134
    }
    const store = createMockStore(defaultAuthState);
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual({
            description: expenses[0].description,
            note: expenses[0].note,
            amount: expenses[0].amount,
            createdAt: expenses[0].createdAt,
            ...updates
        });
        done();
    });
});