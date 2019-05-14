import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import classNames from 'classnames';
import * as actionCreators from "./actions";
import { routes } from '../../../utils/routings';
import {getUnseenRequests, getRequests, getGroupInfo} from './selectors'
import Modal from '../../complexes/Modal';
import RequestFriend from './RequestFriend';

const styles = (vars) => ({
  userHeader: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems('center'),
    ...vars.mixins.justifyContent('space-between'),
    width: '100%',
    background: 'rgba(6, 6, 6, 0.2)',
    padding: '17px 0'
  },
  userWrapper: {
    ...vars.mixins.flexDisplay()
  },
  userpic: {
    width: "105px",
    overflow: 'hidden',
    height: "100px",
    background: `url(${routes.images.skinsProfile})`,
    backgroundPosition: '6px 111px',
    backgroundSize: `385px`,
    position: "relative"
  },
  me: {
    position: 'absolute',
    width: '45px',
    height: '45px',
    left: '47px',
    top: '24px',
    borderRadius: '45px',
  },
  hang: {

  },
  userActions: {
    ...vars.mixins.flexCenter(),
    ...vars.mixins.flexDirection('column'),
    height: '100%',
    padding: '0 30px'
  },
  userInfo: {
    width: '250px',
    height: '60px',
    padding: '13px',
    fontSize: '20px'
  },
  name: {
    color: '#b9ad97'
  },
  state: {
    width: '25px',
    height: '29px',
    overflow: 'hidden',
    position: 'relative',
    background: `url(${routes.images.online})`,
    backgroundSize: '274px',
    cursor: 'pointer',
    '&.away': {
      backgroundPosition: '-37px 58px',
    },
    '&.online': {
      backgroundPosition: '-82px 58px'
    },
    '&.busy': {
      backgroundPosition: '-210px 58px'
    }
  },
  status: {
    ...vars.mixins.flexDisplay(),
    position: 'relative',
    '& >.name': {
      fontSize: '13px',
      letterSpacing: '3px',
      alignItems: 'center',
      display: 'flex',
      height: '25px',
      marginLeft: '8px',
      '&.online': {
        color: 'green'
      }
    }
  },
  stateImg: {},
  otherStates: {
    ...vars.mixins.flexDisplay(),
    position: 'absolute',
    left: '21px',
    width: '0',
    marginLeft: '10px',
    background: '#585858',
    borderRadius: '10px',
    ...vars.mixins.transition("width 0.5s ease-in-out"),
    '&.open': {
      width: '54px'
    }
  },
  actions: {
    ...vars.mixins.flexDisplay(),
  },
  notifications: {
    position: "relative",
    marginRight: '40px'
  },
  bell: {},
  tag: {
    position: 'absolute',
    top: '0',
    right: '19px',
    background: 'wheat',
    color: 'black',
    fontWeight: 'bold',
    padding: '0px 4px',
    fontSize: '10px',
    borderRadius: '4px',
  },
  icons: {
    width: '32px',
    height: '32px'
  },
  iconWrapper: {
    '&.light': {
      '-webkit-filter': 'drop-shadow( 0px 3px 2px rgb(255, 253, 200))',
      'filter': 'drop-shadow( 3px 3px 2px rgb(255, 253, 200))'
    }
  },
  addFriend: {
    marginRight: '35px',
    width: '45px',
    height: '32px',
    overflow: 'hidden',
    position: 'relative',
    background: `url(${routes.images.sprites})`,
    backgroundSize: '126px',
    backgroundPosition: '-121px 564px',
  },
  add: {
    color: 'wheat',
    fontWeight: 'bold',
    fontSize: '14px',
    position: 'absolute',
    right: '3px',
    top: '-4px',
  },
  numbers: {
    ...vars.mixins.flexDisplay(),
    color: '#f3e4d2',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '20px'
  },
  num: {
    '&:not(:last-child)': {
      marginRight: '40px'
    },
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems('center'),
  },
  circle: {
    width: '7px',
    height: '7px',
    borderRadius: '10px',
    marginRight: '10px',
    filter: 'drop-shadow( 3px 3px 2px rgb(255, 253, 200))',
    '-webkit-filter': 'drop-shadow( 0px 0px 2px rgb(220, 220, 220))',
    '&.online': {
      background: 'green',
    },
    '&.busy': {
      background: 'orange',
    },
    '&.total': {
      background: 'gray',
    }
  },
  role: {
    color: '#b9ad97',
    fontSize: '9px',
    letterSpacing: '2px',
    border: '1px solid',
    width: '52px',
    padding: '5px',
    margin: '10px 0 0 0',
    borderRadius: '7px',
    ...vars.mixins.flexCenter(),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  }
});

class UserHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.user.status || 3,
      openState: false,
      password: ''
    }
    this.signout = this.signout.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.openStates = this.openStates.bind(this);
    this.selectState = this.selectState.bind(this);
    this.toggleRequest = this.toggleRequest.bind(this);
  }

  onTextChange(name, e) {
    this.setState({...this.state, [name]: e.target.value});
  }

  selectState(state) {
    this.props.updateState(state, this.props.showToast)
    this.openStates()
  }

  openStates() {
    this.setState({openState: !this.state.openState})
  }
  signout() {
    this.props.signout();
    this.props.history.push('/login')
  }

  toggleRequest() {
    this.setState({requestOpen: !this.state.requestOpen});
  }

  render() {
    const {classes, user} = this.props;
    const states = [1, 2, 3];
    const getOthers = () => states.filter((item) => item !== this.props.user.status);
    const display = {
      1: "online",
      2: "busy",
      3: "away"
    }

    return (
      <div className={classes.userHeader}>
        <div className={classes.userWrapper}>
          <div className={classes.userpic}>
          <img className={classes.me} alt="me" src={user.pic || 'https://s3.amazonaws.com/lol.jeex.io/images/lol.png'} />
          </div>
          <div className={classes.userInfo}>
            <div className={classes.name}>{this.props.user.name}</div>
            <div className={classes.status}>
              <div className={classNames(classes.state, display[this.props.user.status])} onClick={this.openStates}/>
              <div className={classNames(display[this.props.user.status], "name")}>{display[this.props.user.status]}</div>
              <div className={classNames(classes.otherStates, `${this.state.openState ? 'open': ''}`)}>
                {getOthers().map((item, idx) => {
                  return <div
                  key={`list-others-${item}-${idx}`}
                  className={classNames(classes.state, display[item])}
                  onClick={() => this.selectState(item)} />
                })}
              </div>
            </div>
            {(this.props.groupSelected && (this.props.groupSelected.isAdmin || this.props.groupSelected.isMember)) && <div className={classes.role}>{
              this.props.groupSelected.isAdmin ? "admin" : this.props.groupSelected.isMember ? "member" : ''}
            </div>}
          </div>
        </div>
        <div className={classes.userActions}>
          <div className={classes.actions}>
            <div className={classes.notifications}>
              <div className={classNames(classes.iconWrapper, `${this.props.notifications.length ? 'light' : ''}`)}>
                <img className={classNames(classes.bell, classes.icons)} alt="bell" src={routes.images.bell} />
              </div>
              {this.props.notifications.length > 0 && <div className={classes.tag}>{this.props.notifications.length}</div>}
            </div>
            <div className={classes.addFriend} onClick={this.toggleRequest}>
              <span className={classes.add}>+</span>
            </div>
            <div className={classes.exit} onClick={this.signout}>
              <img className={classNames(classes.exit, classes.icons)} alt="exit" src={routes.images.exit} />
            </div>
          </div>
          {this.props.groupSelected && <div className={classes.numbers}>
            <div className={classes.num}><div className={classNames("online", classes.circle)}> </div>
                {this.props.groupSelected.online}
            </div>
            <div className={classes.num}><div className={classNames("busy", classes.circle)}> </div>
                {this.props.groupSelected.busy}
            </div>
            <div className={classes.num}><div className={classNames("total", classes.circle)}> </div>
              {this.props.groupSelected.size} members
            </div>
          </div>}
        </div>

        {this.state.requestOpen && <Modal
          fadeOut={!this.state.requestOpen}
        >
          <RequestFriend close={this.toggleRequest} showToast={this.props.showToast} />
        </Modal>}
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    pageTitle: state.page.title || {},
    notifications: getUnseenRequests(state),
    pendingRequests: getRequests(state),
    groupSelected: getGroupInfo(state),
    user: state.users.currentUser || {}
  };
};


const ftheme = injectSheet(styles);
const fRedux = connect(mapStateToProps, actionCreators);
export default compose(withRouter, fRedux, ftheme)(UserHeader);
