import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {injectIntl} from 'react-intl';
import injectSheet from 'react-jss';
import compose from 'ramda/src/compose';
import isEmpty from 'ramda/src/isEmpty';
import * as actionCreators from './actions';


const styles =
  (vars) => ({
    page: {
      overflow: 'hidden',
      // fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      color: '#505050',
      fontSize: '100%',
      ...vars.mixins.flexDirection('column'),
      ...vars.mixins.justifyContent('space-between'),
      ...vars.mixins.flexDisplay(),
      minHeight: '100vh',
      margin: '0 auto',
      backgroundColor: "#000000"
    },
    header: {
      ...vars.mixins.flexDisplay(),
      ...vars.mixins.flexDirection('column'),
      'min-height': '0px'
    },
    children: {
      ...vars.mixins.flexDisplay(),
      ...vars.mixins.flexDirection('column'),
      flex: '1'
    }
  })


class PageTemplate extends Component {

  componentDidMount() {
    // Ew. I don't think there's a better way to do this, though.
    document.body.style.backgroundColor = '#f9f9f9';
    document.body.style.margin = '0px';
    document.body.style.minHeight = '100%';
  }

  render() {
    const {classes, header, children, pageTitle, pageLoading, intl} = this.props;

    const helmetProps = {
      link: [
        {rel: 'shortcut icon', href: '/favicon.ico'}
      ],
      title: !isEmpty(pageTitle) ? `${intl.formatMessage({id: pageTitle})}` : 'Home | Jeex'
    };

    return (
      <div
        className={classes.page}
        data-sn="page-template"
      >
        <Helmet {...helmetProps} />
        {!pageLoading && <div className={classes.header}>{header}</div>}
        <div className={classes.children}>{children}</div>
      </div>
    );
  }
}

PageTemplate.propTypes = {
  classes: PropTypes.object,
  header: PropTypes.node,
  children: PropTypes.node,
  intl: PropTypes.object.isRequired,
  pageTitle: PropTypes.string.isRequired,
  pageLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    pageTitle: state.page.title || '',
    pageLoading: state.page.loading || false
  };
}

const fRedux = connect(mapStateToProps, actionCreators);
const fTheme = injectSheet(styles);

export default compose(injectIntl, fRedux, fTheme)(PageTemplate);
