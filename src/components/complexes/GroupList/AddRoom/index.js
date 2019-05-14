import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import 'react-toastify/dist/ReactToastify.css'
import {myFirestore } from '../../../../config'

const styles = (vars) => ({
  RequestFriend: {
    ...vars.mixins.flexCenter(),
    ...vars.mixins.flexDirection("column"),
  },
  input: {
    background: 'transparent',
    color: '#c4b998',
    border: 'none',
    width: '380px',
    fontSize: '20px',
    height: '60px',
    borderBottom: '1px solid #7e633b',
    marginBottom: '40px',
    outline: "none",
    padding: "7px 0",
    textAlign: 'center'
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
    fontSize: '10px',
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
    minWidth: '135px',
    maxWidth: '100%',
    padding: '18px 20px',
    background: 'linear-gradient(180deg,#ecc572 0,#815500)',
    marginBottom: '50px',
    marginTop: '20px',
    outline: "none",
    '&:first-child': {
      marginRight: '30px'
    },
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
  wrapper: {
    ...vars.mixins.flexCenter(),
    ...vars.mixins.flexDirection("column"),
  },
  loading: {
    '&.hide': {
      visibility: 'hidden'
    }
  }
});

class RequestFriend extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      purpose: '',
      isLoading: false
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.onStart = this.onStart.bind(this);    
    this.onCancel = this.onCancel.bind(this); 
  }

  onTextChange(name, e) {
    this.setState({...this.state, [name]: e.target.value});
  }

  onCancel() {
    this.props.close()
  }

  onStart() {
    this.setState({ isLoading: true })
    const d = new Date();
    const time = d.getTime();
    const groupName = this.state.name

    let batch = myFirestore.batch();
    const grp = myFirestore.collection("groups").doc(groupName)

    batch.set(grp, {
      created: time,
      name: groupName,
      purpose: this.state.purpose,
      admin: this.props.currentUser.name.toLowerCase(),
      members: {
        [this.props.currentUser.name.toLowerCase()]: true
      },
      messages: {},
      size: 1
    });

    const grp1 = myFirestore.collection("users").doc(`${this.props.currentUser.name.toLowerCase()}`)
    batch.update(grp1, {groups: {...this.props.currentUser.groups, [groupName]: true}});
    
    // Commit the batch
    batch.commit().then(doc => {
      this.setState({isLoading: false});
      this.props.showToast(0, "You created a new room!");
      this.props.close();
    }).catch( error => {
      console.log(error)
      this.props.showToast(2, "Error creating a room.");
      this.setState({isLoading: false})
    });
  }

  render() {
    const {classes} = this.props;
    const {isLoading, name, purpose} = this.state;

    return (
      <div className={classes.RequestFriend}>
          <div className={classes.wrapper}>
            <div className={classes.signinForm}>
              <div className={classes.emailWrapper}>
                <input type="text" onChange={(e) => this.onTextChange("name", e)} className={classes.input} placeholder="Room name..." value={this.state.name} />
              </div>
              <div className={classes.emailWrapper}>
                <input type="text" onChange={(e) => this.onTextChange("purpose", e)} className={classes.input} placeholder="State your purpose..." value={this.state.purpose} />
              </div>
            </div>
            <div className={classes.buttons}>
              <button className={classes.start} onClick={this.onStart} disabled={isLoading || purpose.length === 0 || name.length === 0}>Add</button>
              <button className={classes.start} onClick={this.onCancel} disabled={isLoading}>Cancel</button>
            </div>
          </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  };
};


const ftheme = injectSheet(styles);
const fRedux = connect(mapStateToProps, {});
export default compose(withRouter, fRedux, ftheme)(RequestFriend);
