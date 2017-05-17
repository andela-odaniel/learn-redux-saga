import test from 'tape';
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { jsdom } from 'jsdom';

import { incrementAsync, decrementAsync } from './sagas';
import Counter from './Counter';
import reducer from './reducers';



// SET UP DOM
global.document = jsdom('');
global.window = global.document.defaultView;


// REDUCER TESTS
test('increment action', (assert) => {
    assert.deepEqual(reducer(0,{type: 'INCREMENT'}),1, 'the state should increase by one');
    assert.end();
});

test('decrement action', (assert) => {
    assert.deepEqual(reducer(1,{type: 'DECREMENT'}),0, 'the state should reduce by one');
    assert.end();
});

// SAGA TESTS
test('incrementAsync saga test', (assert) => {
    const gen = incrementAsync();

    assert.deepEqual(gen.next().value, call(delay, 1000), 'incrementalAsync saga must call delay');
    assert.deepEqual(gen.next().value, put({ type: 'INCREMENT', }), 'incrementalAsync must dispatch an increment action');
    assert.deepEqual(gen.next(), { done: true, value: undefined}, 'incrementalAsync should be done');

    assert.end();
});

test('decrementAsync saga test', (assert) => {
    const gen = decrementAsync();

    assert.deepEqual(gen.next().value, call(delay, 1000), 'decrementAsync saga must call delay');
    assert.deepEqual(gen.next().value, put({ type: 'DECREMENT', }), 'decrementAsync must dispatch an decrement action');
    assert.deepEqual(gen.next(), { done: true, value: undefined}, 'decrementAsync should be done');

    assert.end();
});

// COMPONENT TESTS
test('Counter component tests', (assert) => {
    const onIncrement = sinon.spy();
    const onDecrement = sinon.spy();
    const onIncrementAsync = sinon.spy();
    const onDecrementAsync = sinon.spy();

    const wrapper = mount(<Counter 
        value={0} 
        onIncrement={onIncrement} 
        onDecrement={onDecrement} 
        onIncrementAsync={onIncrementAsync} 
        onDecrementAsync={onDecrementAsync}
    />);

    wrapper.find('button#increment').simulate('click');
    wrapper.find('button#decrement').simulate('click');
    wrapper.find('button#incrementAsync').simulate('click');
    wrapper.find('button#decrementAsync').simulate('click');

    
    assert.equal(wrapper.find('div').length, 2, 'Component should contain two divs');
    assert.equal(wrapper.find('button').length, 4, 'Component should contain four buttons');

    assert.equal(wrapper.props().value, 0, 'Component should have an initial state of 0');
    

    assert.equal(onIncrement.callCount,1, 'onIncrement should be called once');
    assert.equal(onDecrement.callCount,1, 'onDecrement should be called once');
    assert.equal(onIncrementAsync.callCount,1, 'onIncrementAsync should be called once');
    assert.equal(onDecrementAsync.callCount,1, 'onDecrementAsync should be called once');

    assert.end();
});