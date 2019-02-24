// @flow
"use strict";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Animated,
  ScrollView
} from "react-native";
import { BlurView } from "expo";
import {
  statusBarHeight,
  headerHeight,
  SafeAreaWithHeader
} from "./DimensionsHelper";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

const vw = SafeAreaWithHeader.vw;
const vh = SafeAreaWithHeader.vh;
const HEADER_HEIGHT = 78;
const BOTTOM_OFFSET = 28;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
class ViewWithTitle extends Component {
  headerHeight = statusBarHeight + headerHeight;

  constructor(props) {
    super(props);
    this.state = { scrollY: new Animated.Value(0) };
  }

  renderTitle = () => {
    if (this.props.title) {
      if (Platform.OS === "ios") {
        let title = this.props.title;
        if (title.length > 34) {
          title = title.substr(0, 32) + "...";
        }
        let titleOpacity = this.state.scrollY.interpolate({
          inputRange: [0, 41, 48],
          outputRange: [0, 0, 1],
          extrapolate: "clamp"
        });
        let borderBottomColor = this.state.scrollY.interpolate({
          inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 1],
          outputRange: ["#ffffff", "#f2f2f2"],
          extrapolate: "clamp"
        });
        return (
          <AnimatedBlurView
            intensity={90}
            style={[
              styles.iOSTitleContainer,
              {
                height: this.headerHeight,
                opacity: titleOpacity,
                borderBottomColor: borderBottomColor
              }
            ]}
          >
            <Text style={styles.iOSTitle}>{title}</Text>
          </AnimatedBlurView>
        );
      } else {
        let title = this.props.title;
        if (title.length > 38) {
          title = title.substr(0, 36) + "...";
        }
        return (
          <View
            style={[
              styles.androidTitleContainer,
              { height: this.headerHeight }
            ]}
          >
            <Text style={styles.androidTitle}>{title}</Text>
          </View>
        );
      }
    }
  };

  setOffsetY = (value) => {
    this.state.scrollY.setValue(value);
  }

  renderIOSBigTitle = () => {
    if (Platform.OS === "ios" && this.props.title) {
      let title = this.props.title;
      let subTitle = this.props.subTitle;
      if (title.length > 19) {
        title = title.substr(0, 17) + "...";
      }
      const fontSize = this.state.scrollY.interpolate({
        inputRange: [-50, 0],
        outputRange: [40, 34],
        extrapolate: "clamp"
      });
      const top = this.state.scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [0, -70]
      });

      const opacity = this.state.scrollY.interpolate({
        inputRange: [30, 70],
        outputRange: [1, 0]
      });

      return (
        <Animated.View
          style={[
            styles.iOSBigTitleContainer,
            {
              transform: [{ translateY: top }],
              opacity: opacity
            }
          ]}
          key="iosBigTitle"
        >
          <View>
            <Text style={[styles.iOSSubTitle]}>{subTitle}</Text>
            <Animated.Text
              allowFontScaling={false}
              style={[
                styles.iOSBigTitle,
                {
                  fontSize: fontSize
                }
              ]}
            >
              {title}
            </Animated.Text>
          </View>
          <View style={[styles.iOSRightTitle]}>
            {
              this.props.rightTitle
            }
          </View>
        </Animated.View>
      );
    }
  };

  renderContentArea = () => {
    if (this.props.children && !this.props.customContentArea) {
      let padding =
        Platform.OS === "ios" && this.props.title ? HEADER_HEIGHT : 0;
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{ paddingTop: padding }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <View style={[styles.contentContainer, { paddingBottom: padding }]}>
            {this.props.children}
          </View>
        </ScrollView>
      );
    }
  };

  renderContentAreaList = () => {
    if (this.props.data && this.props.renderItem) {
      let headerHeight =
        Platform.OS === "ios" && this.props.title ? HEADER_HEIGHT : 0;
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          renderItem={this.props.renderItem}
          ListHeaderComponent={
            <View style={{ width: 100 * vw, height: headerHeight }} />
          }
          data={this.props.data}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        />
      );
    }
  };

  renderCustomContentAreaList = () => {
    if (this.props.customContentArea) {
      const top = this.state.scrollY.interpolate({
        inputRange: [-HEADER_HEIGHT, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT, -HEADER_HEIGHT],
        extrapolate: "clamp"
      });
      return (
        <Animated.View
          style={[
            styles.contentContainer,
            { height: 100 * vh + BOTTOM_OFFSET, marginTop: top, paddingTop: HEADER_HEIGHT, backgroundColor: Colors.backgroundColor }
          ]}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  };

  renderTitleArea = () => {
    return (
      <BlurView
        style={[styles.titleContainer, { height: this.headerHeight }]}
        intensity={90}
        tint="light"
      >
        {this.renderTitle()}
      </BlurView>
    );
  };

  render() {
    return (
      <View style={styles.outerContainer}>
      {this.renderIOSBigTitle()}
      {this.renderTitleArea()}
        <View style={[styles.innerContainer, { height: 100 * vh + BOTTOM_OFFSET }]}>
          {this.renderContentArea()}
          {this.renderContentAreaList()}
          {this.renderCustomContentAreaList()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    width: 100 * vw,
    backgroundColor: Colors.backgroundColor
  },
  titleContainer: {
    width: 100 * vw,
    zIndex: 10,
    backgroundColor: Colors.backgroundColor
  },
  iOSTitleContainer: {
    width: 100 * vw,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    zIndex: 20
  },
  iOSTitleContainerInvisible: {
    width: 100 * vw,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  iOSTitle: {
    marginBottom: 13,
    fontSize: 17,
    lineHeight: 17,
    fontWeight: "bold",
    color: "#353535",
    backgroundColor: "rgba(0,0,0,0)"
  },
  iOSRightTitle:{
    paddingBottom: 15
  },
  androidTitleContainer: {
    width: 100 * vw,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2"
  },
  androidTitleContainerInvisible: {
    width: 100 * vw,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  androidComponentContainer: {
    position: "absolute",
    right: 16,
    bottom: 0,
    width: 100 * vw - 32,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  androidTitle: {
    marginBottom: 16,
    marginLeft: 72,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: "#353535",
    backgroundColor: "rgba(0,0,0,0)"
  },
  iOSBigTitleContainer: {
    position: "absolute",
    top: headerHeight + statusBarHeight,
    left: 0,
    width: 100 * vw,
    height: HEADER_HEIGHT,
    backgroundColor: Colors.backgroundColor,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
    zIndex: 20
  },
  iOSBigTitle: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "bold",
    color: "#353535",
    backgroundColor: "rgba(0,0,0,0)"
  },
  iOSSubTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: Colors.textGray
  },
  innerContainer: {
    position: "relative",
    width: 100 * vw
  },
  contentContainer: {
    width: 100 * vw,
    backgroundColor: "#fff"
  }
});

module.exports = ViewWithTitle;
