import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import classNames from 'classnames';
import * as actionCreators from "./actions";
import { routes } from '../../../utils/routings';
import { getGroupInfo } from './selectors';
import CustomScroll from 'react-custom-scroll/dist/reactCustomScroll'

const styles = (vars) => ({
  userSidebar: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection("column"),
    ...vars.mixins.justifyContent('space-between'),
    // width: '100%',
    background: 'rgba(6, 6, 6, 0.2)',
    width: '300px'
  },
  title: {
    color: '#716d64',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '22px',
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center")
  },
  numbers: {
    marginLeft: '5px',
    color: '#505050'
  },
  groupItem: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.alignItems("center"),
    fontSize: '13px',
    letterSpacing: '1px',
    marginBottom: '10px',
    cursor: "pointer",
    color: '#dcd8c0',
    padding: '1px 15px',
    '&.users': {
      height: '45px',
      textTransform: 'unset',
      fontSize: '15px'
    },
    '&:hover, &.selected': {
      filter:  `drop-shadow( 3px 3px 2px rgb(255, 253, 200))`,
    '-webkit-filter': `drop-shadow( 0px 0px 2px rgb(255, 253, 200))`,
    color: '#ffffff'
    }
  },
  userIcon: {
    backgroundSize: 'cover',
    width: '20px',
    height: '20px',
    marginRight: '15px',
    borderRight: '1px solid #f5deb3',
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
  status: {
    width: '8px',
    height: '8px',
    marginRight: '10px',
    borderRadius: '10px',
    position: 'absolute',
    bottom: '-1px',
    '&.online': {
      background: 'green',
    },
    '&.busy': {
      background: 'orange',
    },
    '&.away': {
      background: 'gray',
    },
    left: '18px',
  },
  userWrapper: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection("column"),
    height: '100%',
    padding: '20px 10px',
    ...vars.mixins.justifyContent("space-between"),
  },
  groupMembers: {
    flex: '1',
    overflow: 'hidden',
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection("column"),
  },
  updates: {
    flex: '1',
    ...vars.mixins.flexCenter()
  },
  divider: {
    background: `url(${routes.images.sidedivider}) no-repeat center center`,
    backgroundSize: 'cover',
    width: '100%',
    height: '30px',
    marginTop: '30px'
  }
});

class UserSidebar extends Component {

  constructor() {
    super();
    this.state = {
      status: 'online',
      password: ''
    }
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(name, e) {
    this.setState({...this.state, [name]: e.target.value});
  }

  render() {
    const {classes, groupInfo} = this.props;
    const display = {
      1: "online",
      2: "busy",
      3: "away"
    }

    return (
      <div className={classes.userSidebar}>
        <div className={classes.userWrapper}>
          <div className={classes.groupMembers}>
            <div className={classes.title}>The People <span className={classes.numbers}>({(groupInfo || []).length})</span></div>
            
            {groupInfo && 
              <CustomScroll allowOuterScroll="{true}">
                <div className={classes.list} style={{height: this.props.height-400}}>
                  {groupInfo.map((item, idx) => {
                    return (<div className={classes.groupItem} key={`sidebar-${item.name}-${idx}`}>
                        <div className={classes.userIcon} style={{backgroundImage: `url(${item.pic || 'https://s3.amazonaws.com/lol.jeex.io/images/lol.png'}`}}>
                          <div className={classNames(classes.status, `${display[item.status]}`)} />
                        </div>
                        <div className={classes.privateName}>{item.name}</div>
                    </div>)
                  })}
                </div>
              </CustomScroll>
            }
          </div>
          <div className={classes.divider} />
          <div className={classes.updates}>
            No Updates
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    pageTitle: state.page.title || {},
    groupInfo: getGroupInfo(state)
  };
};


const ftheme = injectSheet(styles);
const fRedux = connect(mapStateToProps, actionCreators);
export default compose(withRouter, fRedux, ftheme)(UserSidebar);
