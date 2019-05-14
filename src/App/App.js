import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import injectSheet from 'react-jss';
import compose from 'ramda/src/compose';
import {withRouter} from 'react-router';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PageTemplate from '../components/templates/PageTemplate';
import LoadingView from "../components/atoms/LoadingView";
// import Alerts from '../components/molecules/Alerts';

const styles = (vars) => ({
  wrapper: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection('column'),
  },
  content: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection('column'),
    minHeight: '100%',
    fontFamily: '"Helvetica Neue","Segoe UI",Helvetica,Arial,sans-serif',
    fontSize: '14px',
    width: '100%',
  },
  toasty: {
    position: 'absolute',
    zIndex: '100',
  }
});

const DeferredAssets = Loadable({
  loader: () => import('../components/pages/home'),
  loading: LoadingView
});
const DeferredLogin = Loadable({
  loader: () => import('../components/pages/login'),
  loading: LoadingView
});


class App extends React.Component {

  render() {
    const {classes} = this.props;
    const  showToast = (type, message) => {
      // 0 = warning, 1 = success
      switch (type) {
        case 1:
          toast.warning(message)
          break
        case 0:
          toast.success(message)
          break;
        case 2:
          toast.error(message)
          break;
        default:
          break
      }
    }

    return (
      <PageTemplate header={null}>
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          position={toast.POSITION.BOTTOM_RIGHT}
          className={classes.toasty}
        />
        <div className={classes.content} data-sn-component="app">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" render={() => <DeferredAssets showToast={showToast} />} />
            <Route exact path="/login" render={() => <DeferredLogin showToast={showToast} />} />
          </Switch>
        </div>
      </PageTemplate>
    );
  }
}

const ftheme = injectSheet(styles);
export default compose(withRouter, ftheme)(App);
