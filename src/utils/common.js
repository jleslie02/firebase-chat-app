import chain from 'ramda/src/chain';
import toPairs from 'ramda/src/toPairs';
import fromPairs from 'ramda/src/fromPairs';
import map from 'ramda/src/map';
// Flatten an object using dot notation
// Pinched from https://github.com/ramda/ramda/wiki/Cookbook
export const flattenObj = (obj) => {
  const go = obj_ => chain(([k, v]) => {
    if (typeof v === 'object') {
      return map(([k_, v_]) => [`${k}.${k_}`, v_], go(v));
    } else {
      return [[k, v]];
    }
  }, toPairs(obj_));

  return fromPairs(go(obj));
};

export const arrayToObject = (arr = []) => {
  let newObj = {};
  arr.map((item) => {
    newObj[item] = true;
    return null;
  });

  return newObj;
};

export const isToday = (someDate, origin) => {
  const today = origin || new Date()
  const newDate = new Date(someDate);
  return newDate.getDay() === today.getDay() &&
    newDate.getMonth() === today.getMonth() &&
    newDate.getFullYear() === today.getFullYear()
}

export const isYesterday = (someDate) => {
  const yesterday = (d => new Date(d.setDate(d.getDate()-1)) )(new Date());
  return isToday(someDate, yesterday);
}
export const formatDate = (someDate) => {
  const today = new Date(someDate)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return `${months[today.getMonth()]} ${today.getDay()}, ${today.getFullYear()}`;
}
