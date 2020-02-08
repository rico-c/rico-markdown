import { ADD, MINUS, ADD_USER, ARTICLE_LIST } from "../constants/counter";

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
    type: ARTICLE_LIST,
    payload: {
      articleList
    }
  };
};

export const addUserInfo = info => {
  return {
    type: ADD_USER,
    payload: {
      info
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
