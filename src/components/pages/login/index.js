import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import ReactLoading from 'react-loading'
import classNames from 'classnames';
import 'react-toastify/dist/ReactToastify.css'
import * as actionCreators from "./actions";
import { routes } from '../../../utils/routings';
import {myFirebase} from '../../../config'

const styles = (vars) => ({
  login: {
    ...vars.mixins.flexCenter(),
    ...vars.mixins.flexDirection("column"),
  },
  input: {
    background: 'transparent',
    color: '#c4b998',
    border: 'none',
    width: '380px',
    fontSize: '22px',
    height: '50px',
    borderBottom: '1px solid #7e633b',
    marginBottom: '40px',
    outline: "none",
    padding: "7px 0"
  },
  mainDivider: {
    height: '180px',
    position: 'relative',
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.justifyContent("center")
  },
  hang: {
    position: "absolute",
    width: "16px",
    bottom: "55px"
  },
  divider: {
    width: '70%',
    marginTop: '40px'
  },
  secondDivider: {
    textAlign: "center"
  },
  title: {
    width: '100%',
    fontSize: '65px',
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold'
  },
  signinForm: {
    marginTop: '20px'
  },
  start: {
    fontSize: '1.1rem',
    fontWeight: '400',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#937341',
    cursor: 'pointer',
    lineHeight: '1',
    border: 'none',
    position: 'relative',
    zIndex: '1',
    boxShadow: '0 0 25px rgba(0,0,0,.11)',
    transition: 'color .2s',
    minWidth: '220px',
    maxWidth: '100%',
    padding: '18px 20px',
    background: 'linear-gradient(180deg,#ecc572 0,#815500)',
    marginBottom: '50px',
    marginTop: '20px',
    outline: "none",
    '&:before': {
      content: `""`,
      display: "block",
      position: "absolute",
      background: "#111",
      zIndex: "-1",
      top: '2px',
      left: '2px',
      right: '2px',
      bottom: '2px'
    }
  },
  backgroundComponent: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: "#080808",
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
    position: 'absolute',
    ...vars.mixins.flexCenter(),
    ...vars.mixins.flexDirection("column"),
    top: '0',
  },
  loading: {
    '&.hide': {
      visibility: 'hidden'
    }
  }
});

class Login extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      isLoading: false
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.onStart = this.onStart.bind(this);    
  }

  componentWillMount() {
    const {setPageTitle} = this.props;
    setPageTitle(null);
  }

  onTextChange(name, e) {
    this.setState({...this.state, [name]: e.target.value});
  }

  onStart() {
    this.setState({ isLoading: true })
    const inputUser = this.state.name.toLowerCase();
    myFirebase.auth()
      .signInWithEmailAndPassword(`${inputUser}@jeex.io`, this.state.password)
      .then(async result => {
        let user = result.user
        if (user) {
          this.props.populateUser(inputUser, this.props.showToast);
        } else {
          this.props.showToast(0, 'Can not get data')
        }
        this.setState({ isLoading: false })
      })
      .catch(err => {
        this.props.showToast(0, err.message)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const {classes} = this.props;
    const {isLoading, name, password} = this.state;

    return (
      <div className={classes.login}>
          <div className={classes.backgroundComponent} />
          <div className={classes.wrapper}>
            <div className={classes.mainDivider}><img className={classes.hang} alt="hang tag" src={routes.images.hangtag} /></div>
            <div className={classes.title}>IDENTIFY YOURSELF</div>
            <ReactLoading type={"cylon"} color="#fff" height={20} width={60} className={classNames(`${this.state.isLoading ? '' : 'hide'}`, classes.loading)} />
            <div className={classes.secondDivider}><img className={classes.divider} alt="main divider" src={routes.images.mainDivider} /></div>
            <div className={classes.signinForm}>
              <div className={classes.emailWrapper}>
                <input type="text" onChange={(e) => this.onTextChange("name", e)} className={classes.input} placeholder="Summoner name" value={this.state.name} />
              </div>
              <div className={classes.passwordWrapper}>
                <input type="password" onChange={(e) => this.onTextChange("password", e)} className={classes.input} placeholder="Password" value={this.state.password} />
              </div>
            </div>
            <button className={classes.start} onClick={this.onStart} disabled={isLoading || password.length === 0 || name.length === 0}>Unlock</button>
          </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    pageTitle: state.page.title || {}
  };
};


const ftheme = injectSheet(styles);
const fRedux = connect(mapStateToProps, actionCreators);
export default compose(withRouter, fRedux, ftheme)(Login);
