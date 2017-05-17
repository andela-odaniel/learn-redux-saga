import { delay } from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';

export function* helloSaga(){
    console.log('Hello Saga');
}

export function* incrementAsync() {
    yield call(delay,1000);
    yield put({ type: 'INCREMENT'});
}

export function* decrementAsync() {
    yield call(delay, 1000);
    yield put({ type: 'DECREMENT'});
}

export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function* watchDecrementAsync() {
    yield takeEvery('DECREMENT_ASYNC', decrementAsync);
}

export default function* rootSaga(){
    yield all([
        helloSaga(),
        watchIncrementAsync(),
        watchDecrementAsync()
    ]);
};
