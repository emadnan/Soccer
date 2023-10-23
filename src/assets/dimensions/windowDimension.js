import { Dimensions, PixelRatio, Platform,NativeModules } from "react-native";
import ExtraDimensions from 'react-native-extra-dimensions-android';

const { StatusBarManager } = NativeModules;
// import DetectNavbar from 'react-native-detect-navbar-android';

/**
 * It takes a percentage of the screen width and returns the pixel value
 * @returns The width of the screen in pixels.
 */
const widthPercentageToDP = widthPercent => {
  const dim = Dimensions.get("screen");

  if (dim.height >= dim.width)
    this.screenWidth = Dimensions.get("window").width;
  else this.screenWidth = Dimensions.get("window").height;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((this.screenWidth * elemWidth) / 100);
};

/**
 * It takes a percentage of the screen height and returns the pixel value
 * @returns The height of the screen in pixels.
 */
const heightPercentageToDP = heightPercent => {
  const dim = Dimensions.get("screen");
  if (dim.height >= dim.width){
    if(Platform.OS == 'android')
      if(ExtraDimensions.isSoftMenuBarEnabled())
          this.screenHeight = Dimensions.get("window").height - ExtraDimensions.getSoftMenuBarHeight() - ExtraDimensions.getStatusBarHeight()
      else
          this.screenHeight = Dimensions.get("window").height;
    else
    this.screenHeight = Dimensions.get("window").height;

  }else this.screenHeight = Dimensions.get("window").width;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((this.screenHeight * elemHeight) / 100);
};
const IOSStatusBar = () => {return 0}
export { widthPercentageToDP, heightPercentageToDP , IOSStatusBar};
