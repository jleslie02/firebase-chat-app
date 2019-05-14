import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import { injectIntl, FormattedTime } from 'react-intl';
import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import classNames from 'classnames';
import * as actionCreators from "./actions";
import Icon from '../../atoms/Icon';
import { getSelectedChatBoard, getSelectedChat } from './selectors';
import CustomScroll from 'react-custom-scroll/dist/reactCustomScroll'

const styles = (vars) => ({
  chatBoard: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems('center'),
    ...vars.mixins.flexDirection("column"),
    ...vars.mixins.justifyContent('space-between'),
    // width: '100%',
    background: 'rgba(6, 6, 6, 0.2)',
    flex: '1',
    margin: '30px 30px 0 0',
    borderRadius: '10px',
    padding: '15px 25px',
    overflow: 'hidden',
    position: 'relative',
    '& .thumb-horizontal': {
      background: 'white',
      display: 'block!important',
      width: '100%',
      height: '2px'
    },
    '& .thumb-vertical': {
      background: 'white',
      display: 'block!important',
      height: '100%',
      width: '5px'
    }
  },
  userIcon: {
    backgroundSize: 'cover',
    width: '25px',
    height: '25px',
    marginRight: '15px',
    borderRight: '1px solid #f5deb3',
    position: "relative"
  },
  userWrapper: {
    width: '100%'
  },
  groupMessage: {
    marginBottom: '40px'
  },
  groupWrapper: {

  },
  title: {
    ...vars.mixins.flexCenter(),
    padding: '0 20%',
    '&:not(.first)': {
      marginTop: '60px'
    }
  },
  divider: {
    flex: '1',
    height: '1px',
    background: 'linear-gradient(to right, rgba(255,0,0,0), rgb(66, 63, 58))',
    '&.right': {
      background: 'linear-gradient(to left, rgba(255,0,0,0), rgb(66, 63, 58))',
    }
  },
  groupDate: {
    padding: '0 20px',
    textTransform: 'uppercase',
    fontSize: '11px'
  },
  comment: {
    marginTop: '4px',
    fontSize: '14px',
    color: '#d6d1c8',
    padding: '0 0 15px 0',
    borderBottom: '1px solid #2b2b2b',
    letterSpacing: '0.5px'
  },
  name: {
    color: 'rgba(214, 209, 200, 0.45)'
  },
  mainMessage: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection("column"),
    flex: '1'
  },
  message: {
    ...vars.mixins.flexDisplay(),
    margin: '13px 0'
  },
  date: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection("column-reverse"),
    color: 'rgba(214, 209, 200, 0.45)',
    fontFamily: 'exan',
    fontSize: '10px',
    paddingBottom: '7px',
    borderBottom: '1px solid #2b2b2b'
  },
  commentSection: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    ...vars.mixins.flexCenter(),
    background: 'rgba(27, 27, 27, 0.63)'
  },
  commentWrapper: {
    width: '100%',
    ...vars.mixins.flexCenter()
  },
  mainComment: {
    padding: '20px 0 20px 0'
  },
  input: {
    background: 'transparent',
    color: '#d8d8d8',
    border: 'none',
    minWidth: '380px',
    width: '60%',
    fontSize: '15px',
    height: '50px',
    borderBottom: '1px solid #423e37',
    outline: "none",
    padding: "18px 30px",
    '&:focus': {
      borderBottom: '1px solid #bdb3a0',
    }
  },
  icon: {
    background: 'none',
    color: '#9c9a9a',
    fontSize: '18px'
  },
  commentActions: {
    padding: '0 26px',
    marginTop: '10px'
  }
});

const Chat = (props) => {
  const {classes, message, friends} = props;
  return (
    <div className={classes.message}>
      <div className={classes.userIcon} style={{backgroundImage: `url(${(friends[message.user.toLowerCase()] || {}).pic || 'https://s3.amazonaws.com/lol.jeex.io/images/lol.png'})`}} />
      <div className={classes.mainMessage}>
        <div className={classes.name}>{message.user}</div>
        <div className={classes.comment}>{message.text}</div>
      </div>
      <div className={classes.date}><FormattedTime value={new Date(message.created)} /></div>
    </div>
  )
}

class ChatBoard extends Component {

  constructor() {
    super();
    this.state = {
      comment: '',
      height: 0
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.sendChat = this.sendChat.bind(this);
  }

  onTextChange(e) {
    this.setState({comment: e.target.value});
  }

  sendChat(e) {
    const d = new Date();
    const time = d.getTime();
    this.props.sendChat(this.state.comment, this.props.selectedChat, this.props.user, time)
    this.setState({comment: ''})
  }

  render() {
    const {classes, intl, user, selectedChat, users} = this.props;
    const messages = this.props.messages;

    if (user.groups && this.props.groups[selectedChat] && !user.groups[selectedChat]) {
      return <div className={classes.chatBoard}>JOIN THE ROOM TO VIEW CHAT</div>
    }

    return (
      <div className={classes.chatBoard}>
        <CustomScroll allowOuterScroll="{true}">
          <div className={classes.userWrapper} style={{height: this.props.height-400}}>
          {Object.keys(messages).map((group, idx) => {
            return (
              <div className={classes.groupMessage} key={`board-${group}-${idx}`}>
                <div className={classNames(`${idx === 0 ? 'first' : ''}`, classes.title)}>
                  <div className={classes.divider} />
                  <div className={classes.groupDate}>{group}</div>
                  <div className={classNames("right", classes.divider)} />
                </div>
                <div className={classes.groupWrapper}>
                  {messages[group].filter((i) => i).map((message, idx) => {
                    return (
                      <Chat friends={users || {}} key={`board-chat-${message.created}-${idx}`} message={message} intl={intl} classes={classes} />
                    )
                  })}
                </div>
              </div>
            )
          })}
          </div>
        </CustomScroll>
        <div className={classes.commentSection}>
          <div className={classes.commentWrapper}>
            <div className={classes.mainComment}>
              <input type="text" onChange={(e) => this.onTextChange(e)} className={classes.input} placeholder="Type here ..." value={this.state.comment} />
              <div className={classes.commentActions}>
                <div className={classes.loloji}></div>
                <Icon fontProps={{icon: "paperclip"}} className={classes.icon} />
              </div>
            </div>
            <div className={classes.sendWrapper} onClick={this.sendChat}>
              <Icon fontProps={{icon: "paper-plane"}} className={classes.icon} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    pageTitle: state.page.title || {},
    messages: getSelectedChatBoard(state),
    user: state.users.currentUser || {},
    groups: state.groups,
    users: state.friends || {},
    selectedChat: getSelectedChat(state),
  };
};


const ftheme = injectSheet(styles);
const fRedux = connect(mapStateToProps, actionCreators);
export default compose(withRouter, fRedux, injectIntl, ftheme)(ChatBoard);
