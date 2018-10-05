import * as types from '../constants/actionTypes';
import API from '../helpers/api';

export function calculate(aValue, bValue) {
  return (dispatch, getState) => {
    API.post('http://localhost:8080', {
      a: parseInt(aValue),
      b: parseInt(bValue),
    }).then((res) => {
      dispatch({
        type: types.CALCULATE,
        sum: res
      });
    }, (err) => {
      dispatch({
        type: types.CALCULATE,
        sum: res
      });
    });
  };
}
