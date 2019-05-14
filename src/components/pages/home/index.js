import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import * as actionCreators from "./actions";
import UserHeader from '../../complexes/UserHeader';
import { routes } from '../../../utils/routings';
import GroupList from '../../complexes/GroupList';
import ChatBoard from '../../complexes/ChatBoard';
import UserSidebar from '../../complexes/UserSideBar';
import BrowserView from '../../molecules/BrowserView';
require('./customScroll.css')

const styles = (vars) => ({
  homePage: {
    width: '100%',
    position: 'relative'
  },
  backgroundComponent: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: "#151515",
    '&:before': {
      background: `url(${routes.images.bgwelcome}) top`,
      backgroundSize: 'cover',
      display: 'block',
      right: '0',
      bottom: '0',
      opacity: '.15',
      filter: 'blur(8px)',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '-100',
      content: `""`
    }
  },
  wrapper: {
    zIndex: '1',
    position: 'absolute',
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection('column'),
    width: '100%',
    height: '100%'
  },
  divider: {
    background: `url(${routes.images.lolDivider}) no-repeat center center`,
    width: '100%',
    height: '56px',
    position: 'absolute',
    top: '90px'
  },
  mainChat: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.justifyContent('space-between'),
    flex: '1',
    height: '100%'
  }
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      height: 0
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentWillMount() {
    const {setPageTitle} = this.props;
    setPageTitle(null);
    if (!localStorage.getItem('user')) {
      this.props.history.push('/login')
    } else {
      this.updateDimensions();
      const fields = JSON.parse(localStorage.getItem('user'))
      this.props.addUser(fields,  fields.id);
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let documentElement = document.documentElement;
    let body = document.getElementsByTagName('body')[0];
    let height = window.innerHeight || documentElement.clientHeight || body.clientHeight;
    this.setState({height: height});
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.homePage}>
        <div className={classes.backgroundComponent} />
          <BrowserView>
            <div className={classes.wrapper}>
              <UserHeader height={this.state.height} showToast={this.props.showToast} />
              <div className={classes.divider} />
              <BrowserView>
                <div className={classes.mainChat}>
                  <GroupList height={this.state.height} showToast={this.props.showToast}/>
                  <ChatBoard height={this.state.height} />
                  <UserSidebar height={this.state.height}/>
                </div>
              </BrowserView>
            </div>
          </BrowserView>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    pageTitle: state.page.title || {},
    currentUser: state.users.currentUser
  };
};


const ftheme = injectSheet(styles);
const fRedux = connect(mapStateToProps, actionCreators);
export default compose(withRouter, fRedux, ftheme)(Home);
