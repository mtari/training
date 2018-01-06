import moment from 'moment';
import filtersReducers from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducers(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }
    const action = { type: "SORT_BY_DATE" };
    const state = filtersReducers(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'test';
    const action = { type: "SET_TEXT_FILTER", text };
    const state = filtersReducers(undefined, action);
    expect(state.text).toBe(text);
});

test('should set startDate filter', () => {
    const date = moment(0);
    const action = { type: "SET_START_DATE", date };
    const state = filtersReducers(undefined, action);
    expect(state.startDate).toEqual(date);
});

test('should set endDate filter', () => {
    const date = moment(0);
    const action = { type: "SET_END_DATE", date };
    const state = filtersReducers(undefined, action);
    expect(state.endDate).toEqual(date);
});