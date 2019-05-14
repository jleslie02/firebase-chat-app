// @flow weak
import {white, secondary as brandSecondary, neutral, alert as cAlerts} from './colors';

export const light = {
  text: {
    primary: neutral.dark,
    neutral: neutral.light,
    neutralMedium: neutral.medium,
    neutralDark: neutral.dark,
    neutralLighter: neutral.lighter
  },
  background: {
    secondary: brandSecondary.light,
    paper: white
  }
};

export const shades = {light};
export const alert = cAlerts;

export default function createPalette({type = "light"} = {}) {
  return {
    ...shades[type],
    alert
  };
}

export {createPalette};
