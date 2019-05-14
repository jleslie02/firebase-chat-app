import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import classNames from 'classnames';
import Icon from '../../atoms/Icon';
import {getUnreadMessages, getRequests, getSelectedChat, getAllFriends} from './selectors'
import AddRoom from './AddRoom';
import Modal from '../Modal';
import * as actionCreators from "./actions";
import { myFirestore } from '../../../config';
import CustomScroll from 'react-custom-scroll/dist/reactCustomScroll'
require("./animation.css");

const styles = (vars) => ({
  groupList: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection("column"),
    ...vars.mixins.justifyContent('space-between'),
    // width: '100%',
    backgroundImage: `linear-gradient(to left, rgba(255,255,255,0), rgba(6, 6, 6, 0.6))`,
    width: '250px',
    /* margin-top: 3px; */
    borderRadius: '10px',
    padding: '35px 0px 11px 0',
    position: 'relative'
  },
  publicWrapper: {
    padding: '0px 20px',
    height: `calc(100% - 80px)`,
    overflow: `hidden`
  },
  title: {
    color: '#716d64',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '22px',
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
    ...vars.mixins.justifyContent("space-between"),
  },
  add: {
    width: '13px',
    height: '13px',
    borderRadius: '10px',
    border: '1px solid',
    ...vars.mixins.flexCenter(),
    fontSize: '9px',
  },
  groupItem: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
    ...vars.mixins.justifyContent("space-between"),
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '10px',
    cursor: "pointer",
    color: '#dcd8c0',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '10%',
    ...vars.mixins.transition("background-size 0.5s ease-in-out"),
    '&.users': {
      height: '45px',
      textTransform: 'unset',
      fontSize: '15px'
    },
    '&:hover, &.selected': {
      filter:  `drop-shadow( 3px 3px 2px rgb(255, 253, 200))`,
    '-webkit-filter': `drop-shadow( 0px 0px 2px rgb(255, 253, 200))`,
    color: '#ffffff'
    },
    '&.selected': {
      backgroundImage: `linear-gradient(to left, rgba(255,255,255,0), rgba(6, 6, 6, 0.6))`,
      backgroundSize: '100%'
    }
  },
  userIcon: {
    backgroundSize: 'contain',
    width: '30px',
    height: '30px',
    borderRadius: '40px',
    marginRight: '15px',
    position: "relative"
  },
  icon: {
    background: 'none',
    '&.request': {
      border: '1px solid',
      width: '20px',
      height: '20px',
      fontSize: '12px',
      borderRadius: '7px',
    },
    '&.info': {
      width: '25px'
    }
  },
  public: {
    paddingBottom: '30px',
    height: `calc(50%)`
  },
  private: {
    paddingBottom: '50px',
    height: `calc(50%)`
  },
  privateWrapper: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    bottom: '2px'
  },
  end: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
    marginTop: '35px'
  },
  circle: {
    height: '5px',
    width: '5px',
    border: '1px solid #423f3a',
    borderRadius: '5px',
  },
  divider: {
    height: '1px',
    backgroundImage: `linear-gradient(to left, rgba(255,0,0,0), rgb(66, 63, 58))`,
    flex: '1'
  },
  tag: {
    ...vars.layout.tag
  },
  status: {
    width: '10px',
    height: '10px',
    marginRight: '10px',
    borderRadius: '10px',
    position: 'absolute',
    bottom: '-1px',
    left: '25px',
    '&.online': {
      background: 'green',
    },
    '&.busy': {
      background: 'orange',
    },
    '&.away': {
      background: 'gray',
    }
  },
  requestItem: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
    ...vars.mixins.justifyContent("space-between"),
    padding: '15px',
    borderTop: '1px solid',
    borderRadius: '9px',
    marginBottom: '0px',
    background: 'rgb(16, 16, 16)'
  },
  info: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
    color: '#fbf6db'
  },
  friendRequests: {
    maxHeight: '55px',
    overflow: "hidden",
    ...vars.mixins.transition("max-height 0.5s ease-in-out"),
    '&.open': {
      maxHeight: '250px'
    }
  },
  deleteIcon: {
    marginRight: '10px',
    color: 'rgba(255, 0, 0, 0.72)',
    '&:hover': {
      color: 'rgba(255, 0, 0, 1)'
    }
  },
  acceptIcon: {
    color: 'rgba(150, 236, 42, 0.7)',
    '&:hover': {
      color: 'rgb(150, 236, 42);',
    }
  },
  requestActions: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
  },
  requestTag: {
    position: 'relative',
    background: 'none',
    border: '1px solid',
    ...vars.mixins.flexCenter(),
    width: '25px',
    height: '25px',
    borderRadius: '10px',
    '&.has': {
      animation: 'shadow-pulse 1s infinite',
    },
    cursor: "pointer"
  },
  requestHeader: {
    fontSize: '13px',
    position: 'relative',
    borderTop: '1px solid',
    borderRadius: '20px',
    color: '#e8dbad',
    padding: '15px 20px',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
    ...vars.mixins.justifyContent("space-between"),
    '& > span': {
      fontFamily: 'exan',
      letterSpacing: '1px'
    },
    background: 'rgb(16, 16, 16)'
  },
  join: {
    color: '#b9ad97',
    fontSize: '7px',
    letterSpacing: '2px',
    border: '1px solid',
    width: '40px',
    padding: '5px',
    margin: '0 0 0 10px',
    borderRadius: '7px',
    ...vars.mixins.flexCenter(),
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  groupInfo: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
    width: '147px'
  },
  groupName: {
    ...vars.mixins.ellipsify()
  },
  privateName: {
    ...vars.mixins.ellipsify()
  }
});

const FriendRequests = (props) => {
  const {classes, pendingOpen, togglePending, requests, declineRequest, acceptRequest} = props;
  return(
    <div className={classNames(`${pendingOpen ? "open" : ''}`, classes.friendRequests)}>
      <div className={classes.requestHeader}>
        <span className={classes.name}>Pending Requests</span>
        <div className={classNames(`${requests.length > 0 ? 'has': ''}`, classes.requestTag)} onClick={togglePending}>{requests.length}</div>
      </div>
      <div className={classes.requestsList}>
        {requests.map((item, idx) => {
          return (<div className={classes.requestItem} key={`list-request-${item.id}-${idx}`}>
            <div className={classes.info}>
              <Icon fontProps={{icon: "info"}} className={classNames('info', classes.icon)} />
              <div className={classes.userIcon} style={{backgroundImage: `url(${item.pic || 'https://s3.amazonaws.com/lol.jeex.io/images/lol.png'})`}} />
              <div className={classes.privateName}>{item.from}</div>
            </div>
            <div className={classes.requestActions}>
              <div className={classes.deleteIcon} onClick={() => declineRequest(item.from, item.id)}><Icon fontProps={{icon: "times"}} className={classNames("request", classes.icon)} /></div>
              <div className={classes.acceptIcon} onClick={() => acceptRequest(item.from, item.id)}><Icon fontProps={{icon: "check"}} className={classNames("request", classes.icon)} /></div>
            </div>
          </div>)
        })}
      </div>
    </div>
  )
}

class GroupList extends Component {

  constructor() {
    super();
    this.state = {
      selected: null,
      pendingOpen: false
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.togglePending = this.togglePending.bind(this);
    this.setSelectedChat = this.setSelectedChat.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.toggleRequest = this.toggleRequest.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
  }

  onTextChange(name, e) {
    this.setState({...this.state, [name]: e.target.value});
  }

  togglePending() {
    this.setState({pendingOpen: !this.state.pendingOpen})
  }

  setSelectedChat(name) {
    this.props.setSelectedChat(name)
    if((this.props.unreadMessages[name.toLowerCase()] || []).length > 0) {
      this.props.readAllMessages(name.toLowerCase())
    }
  }

  acceptRequest(from, id) {
    this.props.acceptRequest(from.toLowerCase(), id)
  }

  declineRequest(from, id) {
    this.props.declineRequest(from.toLowerCase(), id)
  }

  joinRoom(group) {
    let batch = myFirestore.batch();
    const grp = myFirestore.collection("groups").doc(group)

    batch.update(grp, {
      members: {
        ...this.props.groupList[group].members,
        [this.props.currentUser.name.toLowerCase()]: true
      },
      size: this.props.groupList[group].size + 1
    });

    const grp1 = myFirestore.collection("users").doc(`${this.props.currentUser.name.toLowerCase()}`)
    batch.update(grp1, {groups: {...this.props.currentUser.groups, [group]: true}});
    
    // Commit the batch
    batch.commit().then(doc => {
      this.setState({isLoading: false});
      this.props.showToast(0, `Welcome to ${group}!`);
    }).catch( error => {
      this.props.showToast(2, "Error while joining room!");
    });
  }

  toggleRequest() {
    this.setState({requestOpen: !this.state.requestOpen});
  }

  render() {
    const {classes, groups, currentUser} = this.props;
    const display = {
      1: "online",
      2: "busy",
      3: "away"
    }

    return (
      <div className={classes.groupList}>
        <div className={classes.publicWrapper}>
          <div className={classes.public}>
            <div className={classes.title}>
              Public Rooms
              <div className={classes.add} onClick={this.toggleRequest}><Icon fontProps={{icon: "plus"}} className={classes.icon} /></div></div>
              <CustomScroll allowOuterScroll="{true}">
                <div className={classes.list} style={{height: this.props.height/2 - 200}}>
                  {groups.map((item, idx) => {
                    return (<div
                        key={`list-public-${item.name}-${idx}`}
                        className={classNames(`${item.name.toLowerCase() === this.props.selectedChat.toLowerCase() ? "selected" : ''}`, classes.groupItem)}
                        onClick={() => this.setSelectedChat(item.name)}
                      >
                        <div className={classes.groupInfo}>
                          <div className={classes.groupIcon}><Icon fontProps={{icon: "globe-americas"}} className={classes.icon} /></div>
                          <div className={classes.groupName} title={item.name}><span>{item.name}</span></div>
                        </div>
                        {(currentUser.groups && !currentUser.groups[item.name]) && <div className={classes.join} onClick={() => this.joinRoom(item.name)}>+ join</div>}
                    </div>)
                  })}
                </div>
              </CustomScroll>
            <div className={classes.end}>
              <div className={classes.circle}></div>
              <div className={classes.divider}></div>
            </div>
          </div>
          <div className={classes.private}>
            <div className={classes.title}>My Gs</div>
            <CustomScroll allowOuterScroll="{true}">
              <div className={classes.list} style={{height: this.props.height/2 - 200}}>
              {this.props.friends.map((item, idx) => {
                return (<div
                    key={`list-private-${item.name}-${idx}`}
                    className={classNames("users", `${item.name.toLowerCase()=== this.props.selectedChat ? "selected" : ''}`, classes.groupItem)}
                    onClick={() => this.setSelectedChat(item.name.toLowerCase())}
                  >
                    <div className={classes.userIcon}  style={{backgroundImage: `url(${item.pic || 'https://s3.amazonaws.com/lol.jeex.io/images/lol.png'})`}}>
                      {(this.props.unreadMessages[item.name.toLowerCase()] || []).length > 0 &&
                        <div className={classes.tag}>{(this.props.unreadMessages[item.name.toLowerCase()] || []).length}</div>
                      }
                      <div className={classNames(classes.status, display[item.status])} />
                    </div>
                    <div className={classes.privateName} title={item.name}>{item.name}</div>
                </div>)
              })}
            </div>
            </CustomScroll>
            <div className={classes.end}>
              <div className={classes.circle}></div>
              <div className={classes.divider}></div>
            </div>
          </div>
        </div>
        <div className={classes.privateWrapper}>
          <FriendRequests
            declineRequest={this.declineRequest}
            acceptRequest={this.acceptRequest}
            requests={this.props.requests}
            classes={classes} pendingOpen={this.state.pendingOpen} togglePending={this.togglePending} />
        </div>
        {this.state.requestOpen && <Modal
          fadeOut={!this.state.requestOpen}
        >
          <AddRoom close={this.toggleRequest} showToast={this.props.showToast} />
        </Modal>}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    users: state.friends,
    friends: getAllFriends(state),
    unreadMessages: getUnreadMessages(state),
    selectedChat: getSelectedChat(state),
    requests: getRequests(state),
    currentUser: state.users.currentUser || {},
    groups: Object.values(state.groups) || [],
    groupList: state.groups || {}
  };
};


const ftheme = injectSheet(styles);
const fRedux = connect(mapStateToProps, actionCreators);
export default compose(withRouter, fRedux, ftheme)(GroupList);
