import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import OnboardingScreen from "./src/screens/Onboarding1";
import OnboardingScreen2 from "./src/screens/Onboarding2";
import SignupScreen from "./src/screens/Signup";
import LandingScreen from "./src/screens/Landing";
import VerifySignupScreen from "./src/screens/Verify";
import SuccessScreen from "./src/screens/Success";
import DashboardScreen from "./src/screens/Dashboard";
import Contact from "./src/screens/Contact";


const MainNavigator = createStackNavigator(
  {
    Home: { screen: OnboardingScreen },
    Home2: { screen: OnboardingScreen2 },
    Signup: { screen: SignupScreen },
    Landing: { screen: LandingScreen },
    Verify: { screen: VerifySignupScreen },
    Success: { screen: SuccessScreen },
    Dashboard: { screen: DashboardScreen },
    ContactSelect: { screen: Contact}
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
