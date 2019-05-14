import mixins from './mixins';
import {danger, tertiary} from './colors';

export default {
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#216092'
  },
  input: {
    boxSizing: 'border-box',
    outlineColor: 'transparent',
    outlineStyle: 'none',
    background: 'none',
    boxShadow: 'none',
    outline: 'none',
    ...mixins().transition('border-color ease-in-out .15s, box-shadow ease-in-out .15s'),
    height: '35px',
    fontSize: '11px',
    border: '1px solid #e5e5e5',
    borderRadius: '3px',
    backgroundColor: '#FCFDFD',
    color: '#505050',
    padding: '0 10px',
    '&:focus': {
      backgroundColor: 'white',
      borderColor: tertiary.standard
    },
    '&:disabled': {
      cursor: 'not-allowed'
    },
    '&.error': {
      borderColor: danger.standard
    }
  },
  link: {
    'color': '#365abd',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&.warning': {
      'color': '#f0ad4e',
    }
  },
  label: {
    fontWeight: 'bold',
    width: "126px",
    marginRight: '16px',
    color: '#575757',
    fontSize: '16px'
  },
  navBar: {
    navbarLeft: {
      float: 'left !important',
      margin: 0,
      padding: 0
    },
    navbarRight: {
      float: 'right !important',
      margin: 0,
      padding: 0,
      height: '50px'
    },
    navbarLi: {
      ...mixins().flexDisplay(),
      float: 'left',
      listStyle: 'none',
      'z-index': '5',
      'border-bottom': '4px solid transparent',
      '&.active': {
        'border-bottom': '4px solid #82ae2f'
      }
    },
    navbarLink: {
      'height': '100%',
      'width': '100%',
      'font-size': '12px',
      'color': '#505050',
      'padding': '20px 20px 12px 20px',
      'text-transform': 'uppercase',
      'text-decoration': 'none',
      'font-family': 'exan',
      'cursor': 'pointer',
      '&.right-subMenu': {
        'padding': '15px 20px 12px 20px',
      },
      '&.active': {
        'border-bottom': '4px solid #82ae2f'
      }
    },
    dropdownMenu: {
      'padding': '0',
      'max-height': '500px',
      'overflow': 'auto',
      'background-color': '#fff',
      'border': 'none',
      'font-size': '11px',
      ...mixins().boxShadow('0 2px 12px rgba(0,0,0,0.175)'),
      'width': 'auto',
      'margin-top': '10px',
      'border-radius': '4px',
      'z-index': '3',
      '&.right-subMenu': {
        'right': '7%'
      }
    },
    dropdownLink: {
      ...mixins().flexDisplay(),
      'text-align': 'left',
      'border-bottom': '4px solid transparent',
      '&.active': {
        'border-bottom': '4px solid #82ae2f'
      },
      '&.dropdown-header': {
        'border-bottom': '1px solid #e5e5e5'
      },
      '&:hover': {
        '& >a': {
          'color': '#82ae2f'
        }
      }
    }
  },
  badge: {
    display: 'inline-block',
    minWidth: '10px',
    padding: '3px 7px',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: '1',
    verticalAlign: 'baseline',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    backgroundColor: '#a7a9aa',
    borderRadius: '10px',
    top: '20px',
    '&.hide': {
      'display': 'none'
    }
  },
  tag: {
    position: 'absolute',
    top: '-3px',
    left: '25px',
    color: 'black',
    background: 'wheat',
    fontWeight: 'bold',
    padding: '0px 4px',
    fontSize: '10px',
    borderRadius: '4px',
  }
};
