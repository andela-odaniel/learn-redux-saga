const actions = {
  'INCREMENT': (action, state = 0) => state + 1,
  'DECREMENT': (action, state = 0) => state - 1
}

export default (state = 0, action) => {
  return actions[action.type] ? actions[action.type](action) : state;
}
