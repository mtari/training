import loginReducer from './../../reducers/auth';

test('should set uid for login', () => {
    const uid = 'uid';
    const action = { type: 'LOGIN', uid };
    const state = loginReducer(undefined, action);
    expect(state).toEqual({
        uid
    });
});

test('should clear uid for logout', () => {
    const action = { type: 'LOGOUT' };
    const state = loginReducer({ uid: 'uid' }, action);
    expect(state).toEqual({});
});