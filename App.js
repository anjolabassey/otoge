import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
import OnboardingScreen from "./src/screens/Onboarding1";
import { Header } from "react-navigation-stack";
// import Onboarding from "./src/components/Onboarding1";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: OnboardingScreen },
    Profile: { screen: OnboardingScreen }
  },
  {

    // header: null,
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    color: "#fff",
    justifyContent: "center",
    width: "100%"
  }
});
