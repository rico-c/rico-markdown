import {
  ADD,
  MINUS
} from '../constants/counter'

export const add = () => {
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

export const articleList = articleList => {
  return {
    type: ARTTICLE_LIST,
    payload: {
      articleList
    }
  };
};

export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

export function refreshArticleList(list) {
  return dispatch => {
    dispatch(articleList(list));
  };
}
