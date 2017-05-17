/*eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync, onDecrementAsync }) =>
      <div>
        <button onClick={onIncrement} id='increment'>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement} id='decrement'>
          Decrement
        </button>
        {' '}
        <button onClick={onIncrementAsync} id='incrementAsync'>Increment After One Second</button>
        {' '}
        <button onClick={onDecrementAsync} id='decrementAsync'>Decrement After One Second</button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
      </div>

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter
