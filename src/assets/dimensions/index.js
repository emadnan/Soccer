import {
  widthPercentageToDP,
  heightPercentageToDP,
  IOSStatusBar,
} from './windowDimension';

/**
 * It takes a percentage of the screen size and returns the pixel value
 */
const Size = num =>
  Math.sqrt(
    heightPercentageToDP('100%') * heightPercentageToDP('100%') +
      widthPercentageToDP('100%') * widthPercentageToDP('100%'),
  ) *
  (num / 100);
/**
 * 
 * It's a function that takes a number and returns a height percentage
 */
const hp = num => heightPercentageToDP(`${num}%`);
/**
 * It takes a number as an argument and returns the width of the screen in percentage
 */
const wp = num => widthPercentageToDP(`${num}%`);
/* It's a ternary operator. It's checking if the IOSStatusBar() is greater than 20. If it is, it
returns 5. If it's not, it returns the IOSStatusBar(). */
const IOS = IOSStatusBar() > 20 ? 5 : IOSStatusBar();
export {Size, hp, wp, IOS};
