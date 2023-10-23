import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Colors } from '../../assets/color';


export default class Button extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          width: this.props.width,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onPress}
          disabled={this.props.disabled}
          style={{
            backgroundColor: this.props.disabled ? Colors.lightGrey: this.props.backgroundColor,
            borderRadius: this.props.borderRadius,
            height: '100%',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',

            borderWidth: this.props.borderWidth ? this.props.borderWidth : 0,
            borderColor: this.props.borderColor ? this.props.borderColor : 0,
          }}>
          {this.props.loading ? (
            <ActivityIndicator
              style={{alignItems: 'center', justifyContent: 'center'}}
              size={'small'}
              color={Colors.white}
            />
          ) : (
            <Text
              style={{
                color: this.props.textColor,
                fontSize: this.props.textSize,
                textAlign: this.props.textAlign,
              }}>
              {this.props.text}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
