import { ADD, MINUS, ARTICLE_LIST } from "../constants/counter";

const INITIAL_STATE = {
  num: 0,
  articleList: []
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

    default:
      return state;
  }
}
