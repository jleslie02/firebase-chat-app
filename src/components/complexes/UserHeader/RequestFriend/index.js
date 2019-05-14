import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import 'react-toastify/dist/ReactToastify.css'
import * as actionCreators from "./actions";
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
      isLoading: false
    }
    this.onTextChange = this.onTextChange.bind(this);
    this.onStart = this.onStart.bind(this);    
    this.onCancel = this.onCancel.bind(this); 
  }

  componentWillMount() {

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
    const inputUser = this.state.name.toLowerCase();
    myFirestore
    .collection("users")
    .doc(inputUser)
    .get().then(doc => {
      if (doc.exists) {
        myFirestore.collection("requests")
          .get().then(querySnapshot => {
            let idx = querySnapshot.docs.length

            const alreadyRequested = (doc.data().sentRequests || {})[this.props.currentUser.name.toLowerCase()];
            if (this.props.currentUser.friends[inputUser]) {
              this.props.showToast(1, `You and ${doc.data().name} are already friends`);
              this.setState({isLoading: false});
            } else if (alreadyRequested) {
              this.props.showToast(1, `You already sent a request to ${doc.data().name}`);
              this.setState({isLoading: false});
            } else {
              let batch = myFirestore.batch();
              // Get a new write batch
              
              const grp = myFirestore.collection("requests").doc(`${idx}`)
              batch.set(grp, {
                created: time,
                seen: false,
                from: this.props.currentUser.name.toLowerCase(),
                id: idx,
                to: inputUser,
              });

              const grp1 = myFirestore.collection("users").doc(`${inputUser}`)
              batch.update(grp1, {requests: {...doc.data().requests, [idx]: true}});
              const grp2 = myFirestore.collection("users").doc(`${this.props.currentUser.name.toLowerCase()}`)
              batch.update(grp2, {sentRequests: {...this.props.currentUser.sentRequests, [inputUser]: true}});
              
              // Commit the batch
              batch.commit()
              this.setState({isLoading: false});
              this.props.showToast(0, "Friend request sent!");
              this.props.close();
            }
          });
      } else {
        this.props.showToast(2, "No user with such a name.")
        this.setState({isLoading: false})
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
        this.setState({isLoading: false})
    });
  }

  render() {
    const {classes} = this.props;
    const {isLoading, name} = this.state;

    return (
      <div className={classes.RequestFriend}>
          <div className={classes.wrapper}>
            <div className={classes.signinForm}>
              <div className={classes.emailWrapper}>
                <input type="text" onChange={(e) => this.onTextChange("name", e)} className={classes.input} placeholder="Summoner name" value={this.state.name} />
              </div>
            </div>
            <div className={classes.buttons}>
              <button className={classes.start} onClick={this.onStart} disabled={isLoading || name.length === 0}>Send</button>
              <button className={classes.start} onClick={this.onCancel} disabled={isLoading}>Cancel</button>
            </div>
          </div>
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
export default compose(withRouter, fRedux, ftheme)(RequestFriend);
