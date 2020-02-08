import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import {
  AtList,
  AtListItem,
  AtFab,
  AtIcon,
  AtSearchBar,
  AtCurtain,
  AtButton,
  AtMessage
} from "taro-ui";
import {
  add,
  minus,
  asyncAdd,
  refreshArticleList,
  addUserInfo
} from "../../actions/counter";
import "./index.less";
import wechatIcon from '../../assets/imgs/wechat.png';

const db = wx.cloud.database();

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
    },
    addUser(info) {
      dispatch(addUserInfo(info));
    },
    refreshList(info) {
      dispatch(refreshArticleList(info));
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
      articleList: [],
      showLogin: false
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  //   this.setState({
  //     articleList: nextProps.articleList
  //   });
  // }

  async componentDidMount() {
    // 如果没有授权则打开授权按钮
    Taro.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          Taro.getUserInfo({
            success: res => {
              console.log(res);
              this.props.addUser(res.userInfo);
              this.updateList();
            }
          });
        } else {
          this.setState({
            showLogin: true
          });
        }
      }
    });
  }

  onGotUserInfo(e) {
    console.log(e);
    if (e.detail.userInfo) {
      this.setState({
        showLogin: false
      });
      this.props.addUser(e.detail.userInfo);
      this.updateList();
    } else {
      Taro.atMessage({
        message: "请先点击授权",
        type: "warning"
      });
    }
  }

  async onButtonClick() {
    // this.setState({
    //   current: value
    // });
    const insertRes = await db.collection("users").add({
      data: {
        title: new Date().toISOString(),
        content: 'testttt'
      },
      success: res => {
        console.log(res);
        this.updateList();
      }
    });
  }

  updateList() {
    db.collection("users").get({
      limit: 99999,
      success: res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data);
        this.props.refreshList(res.data);
      }
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
          {this.props.counter.articleList.map((i, index) => (
            <AtListItem
              title={i.title}
              arrow="right"
              size="small"
              key={i.title + index}
            />
          ))}
        </AtList>
        <AtCurtain isOpened={this.state.showLogin} className="curtain">
          <AtButton
            openType="getUserInfo"
            className="get-authorize"
            onGetUserInfo={this.onGotUserInfo.bind(this)}
            type="primary"
          >
            <image src={wechatIcon} style="width:25px;height: 25px" />
            请点击按钮获取微信授权
          </AtButton>
        </AtCurtain>
        <View className="float-btn">
          <AtFab onClick={this.onButtonClick.bind(this)} size="small">
            <AtIcon
              className="at-fab__icon"
              value="add"
              size="20"
              color="#ffffff"
            ></AtIcon>
          </AtFab>
          <image
            src={this.props.counter.userInfo.avatarUrl}
            style="width:80rpx;height:80rpx;border-radius:50%;box-shadow:1px 1px 5px #000000;margin-top: 15px;box-shadow: 0 6rpx 10rpx 5rpx rgba(0, 0, 0, 0.2)"
          />
        </View>
      </View>
    );
  }
}

export default Index;
