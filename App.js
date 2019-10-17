import React, { Component } from "react";
import { AppLoading } from "expo";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import twitter from "react-native-simple-twitter";

import OnboardingScreen from "./src/screens/Onboarding1";
import OnboardingScreen2 from "./src/screens/Onboarding2";
import SignupScreen from "./src/screens/Signup";
import LandingScreen from "./src/screens/Landing";
import VerifySignupScreen from "./src/screens/Verify";
import SuccessScreen from "./src/screens/Success";
import DashboardScreen from "./src/screens/Dashboard";
import LandingSreen from "./src/screens/Landing";
import Contact from "./src/screens/Contact";
import RecordScreen from "./src/screens/Record";
import EmergencySuccessScreen from "./src/screens/EmergencySuccess";



const MainNavigator = createStackNavigator(
  {
    Home: { screen: OnboardingScreen },
    Home2: { screen: OnboardingScreen2 },
    Signup: { screen: SignupScreen },
    Landing: { screen: LandingScreen },
    Verify: { screen: VerifySignupScreen },
    Dashboard: { screen: DashboardScreen },
    Success: { screen: SuccessScreen },
    Landing: { screen: LandingSreen },
    ContactSelect: { screen: Contact },
    Record: { screen: RecordScreen },
    Emergency: { screen: EmergencySuccessScreen }
  },
  {
    // header: null,
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false
    };
  }

  loadResourcesAsync = async () =>
    Promise.all([
      twitter.setConsumerKey(
        Constants.manifest.extra.twitter.consumerKey,
        Constants.manifest.extra.twitter.consumerKeySecret
      )
    ]);

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
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
