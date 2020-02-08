import { ADD, MINUS, ARTICLE_LIST, ADD_USER } from "../constants/counter";

const INITIAL_STATE = {
  num: 0,
  articleList: [],
  userInfo: {}
};

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      };

    case ARTICLE_LIST:
      return {
        ...state,
        articleList: action.payload.articleList
      };

    case ADD_USER:
      return {
        ...state,
        userInfo: action.payload.info
      };

    default:
      return state;
  }
}
