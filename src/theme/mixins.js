// @flow weak
export default function createMixins() {
  function boxShadow(shadow) {
    return ({
      '-webkit-box-shadow': shadow,
      'box-shadow': shadow,
      '-moz-box-shadow': shadow
    });
  }

  function transition(transition) {
    return ({
      '-webkit-transition': transition,
      '-moz-transition': transition,
      '-o-transition': transition,
      'transition': transition
    });
  }

  function transform(transform) {
    return ({
      '-webkit-transform': transform,
      '-moz-transform': transform,
      '-ms-transform': transform,
      'transform': transform
    });
  }




  // Source: https://gist.github.com/jayj/4012969

  // --------------------------------------------------
  // Flexbox LESS mixins
  // The spec: http://www.w3.org/TR/css3-flexbox
  // --------------------------------------------------

  function flexDisplay() {
    return ({
      'display': 'flex'
    });
  }

  // The 'flex' shorthand
  // - applies to: flex items
  // <positive-number>, initial, auto, or none
  function flex(param) {
    let columns = param;
    if (!param)
      columns = 'initial';

    return ({
      '-webkit-flex': columns,
      '-moz-flex': columns,
      '-ms-flex': columns,
      'flex': columns
    });
  }

  // Flex Flow Direction
  // - applies to: flex containers
  // row | row-reverse | column | column-reverse
  function flexDirection(param) {
    let direction = param;
    if (!param)
      direction = 'row';

    return ({
      '-webkit-flex-direction': direction,
      '-moz-flex-direction': direction,
      '-ms-flex-direction': direction,
      'flex-direction': direction
    });
  }

  // Flex Line Wrapping
  // - applies to: flex containers
  // nowrap | wrap | wrap-reverse
  function flexWrap(param) {
    let wrap = param;
    if (!param)
      wrap = 'nowrap';

    return ({
      '-webkit-flex-wrap': wrap,
      '-moz-flex-wrap': wrap,
      '-ms-flex-wrap': wrap,
      'flex-wrap': wrap
    });
  }

  // Flex Direction and Wrap
  // - applies to: flex containers
  // <flex-direction> || <flex-wrap>
  function flexFlow(param) {
    let flow = param;
    if (!param)
      flow = 'initial';

    return ({
      '-webkit-flex-flow': flow,
      '-moz-flex-flow': flow,
      '-ms-flex-flow': flow,
      'flex-flow': flow
    });
  }

  // Display Order
  // - applies to: flex items
  // <integer>
  function flexOrder(param) {
    let order = param;
    if (!param)
      order = '0';

    return ({
      '-webkit-flex-order': order,
      '-moz-flex-order': order,
      '-ms-flex-order': order,
      'flex-order': order
    });
  }

  // Flex grow factor
  // - applies to: flex items
  // <number>
  function flexGrow(param) {
    let growth = param;
    if (!param)
      growth = '0';

    return ({
      '-webkit-flex-grow': growth,
      '-moz-flex-grow': growth,
      '-ms-flex-grow': growth,
      'flex-grow': growth
    });
  }

  // Flex shrink
  // - applies to: flex item shrink factor
  // <number>
  function flexShrink(param) {
    let shrink = param;
    if (!param)
      shrink = '0';

    return ({
      '-webkit-flex-shrink': shrink,
      '-moz-flex-shrink': shrink,
      '-ms-flex-shrink': shrink,
      'flex-shrink': shrink
    });
  }

  // Flex basis
  // - the initial main size of the flex item
  // - applies to: flex itemsnitial main size of the flex item
  // <width>
  function flexBasis(param) {
    let basis = param;
    if (!param)
      basis = 'auto';

    return ({
      '-webkit-flex-basis': basis,
      '-moz-flex-basis': basis,
      '-ms-flex-basis': basis,
      'flex-basis': basis
    });
  }

  // Axis Alignment
  // - applies to: flex containers
  // flex-start | flex-end | center | space-between | space-around
  function justifyContent(param) {
    let justify = param;
    if (!param)
      justify = 'flex-start';

    return ({
      '-webkit-justify-content': justify,
      '-moz-justify-content': justify,
      '-ms-justify-content': justify,
      'justify-content': justify
    });
  }

  // Packing Flex Lines
  // - applies to: multi-line flex containers
  // flex-start | flex-end | center | space-between | space-around | stretch
  function alignContent(param) {
    let align = param;
    if (!param)
      align = 'stretch';

    return ({
      '-webkit-align-content': align,
      '-moz-align-content': align,
      '-ms-align-content': align,
      'align-content': align
    });
  }

  // Cross-axis Alignment
  // - applies to: flex containers
  // flex-start | flex-end | center | baseline | stretch
  function alignItems(param) {
    let align = param;
    if (!param)
      align = 'stretch';

    return ({
      '-webkit-align-items': align,
      '-moz-align-items': align,
      '-ms-align-items': align,
      'align-items': align
    });
  }

  // Cross-axis Alignment
  // - applies to: flex items
  // auto | flex-start | flex-end | center | baseline | stretch
  function alignSelf(param) {
    let align = param;
    if (!param)
      align = 'auto';

    return ({
      '-webkit-align-self': align,
      '-moz-align-self': align,
      '-ms-align-self': align,
      'align-self': align
    });
  }

  function placeholder(color, fontSize) {
    return ({
      '&::-webkit-input-placeholder': {
        'color': color,
        'font-size': fontSize,
        'font-weight': '200',
        marginBottom: '20px'
      },
      '&:-moz-placeholder': {
        'color': color,
        'font-size': fontSize,
        'font-weight': '200',
        marginBottom: '20px'
      },
      '&::-moz-placeholder': {
        'color': color,
        'font-size': fontSize,
        'font-weight': '200'
      },
      '&:-ms-input-placeholder': {
        'color': color,
        'font-size': fontSize,
        'font-weight': '200',
        marginBottom: '20px'
      },
      '&::-ms-input-placeholder': {
        'color': color,
        'font-size': fontSize,
        'font-weight': '200',
        marginBottom: '20px'
      }
    });
  }

  function ellipsify() {
    return ({
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    });
  }

  function userSelect() {
    return ({
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none"
    });
  }

  function flexCenter() {
    return ({
      ...flexDisplay(),
      ...alignItems('center'),
      ...justifyContent('center')
    });
  }

  return {
    boxShadow,
    transition,
    transform,
    flexDisplay,
    alignSelf,
    alignContent,
    alignItems,
    justifyContent,
    flexDirection,
    flexGrow,
    flexShrink,
    flex,
    flexBasis,
    flexWrap,
    flexFlow,
    flexOrder,
    placeholder,
    ellipsify,
    flexCenter,
    userSelect
  };
}
