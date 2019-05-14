// @flow weak

import createMixins from './mixins';
import * as colors from './colors';
import layout from './layout';
import makePalette from './palette';

export function createAtomicTheme() {
  const theme = {
    dir: 'ltr',
    colors,
    layout,
    mixins: createMixins(),
    palette: makePalette()
  };
  return theme;
}

export default createAtomicTheme;
