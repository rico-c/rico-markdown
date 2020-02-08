import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtList, AtListItem, AtFab, AtIcon, AtSearchBar } from "taro-ui";
import {
  add,
  minus,
  asyncAdd,
  refreshArticleList
} from "../../actions/counter";
import axios from 'axios';

import "./index.less";

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add());
    },
    dec() {
      dispatch(minus());
    },
    asyncAdd() {
      dispatch(asyncAdd());
    }
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: "Markdown笔记本"
  };

  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      value: "",
      articleList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    this.setState({
      articleList: nextProps.articleList
    });
  }

  async componentDidMount() {
    const r = await Taro.login();
    console.log(r);
    // await Taro.setStorageSync("userInfo", res);
    // const user = await Taro.request({
    //   url: "https://api.weixin.qq.com/sns/jscode2session",
    //   data: {
    //     appid: "wx0dddc786f32c6ef5",
    //     secret: "adapter",
    //     js_code: "",
    //     grant_type: "authorization_code"
    //   }
    // });
    // console.log(user);
    Taro.cloud.callFunction({
      name: "login",
      complete: res => {
        console.log("callFunction test result: ", res);
      }
    });
  }

  onButtonClick(value) {
    this.setState({
      current: value
    });
  }

  onChange(v) {
    console.log(v);
  }

  render() {
    return (
      <View className="index">
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <AtList>
          {this.state.articleList.map(i => (
            <AtListItem title={i.title} arrow="right" size="small" />
          ))}
        </AtList>
        <View className="float-btn">
          <AtFab onClick={this.onButtonClick.bind(this)} size="small">
            <AtIcon
              className="at-fab__icon"
              value="add"
              size="20"
              color="#ffffff"
            ></AtIcon>
          </AtFab>
        </View>
      </View>
    );
  }
}

export default Index;
