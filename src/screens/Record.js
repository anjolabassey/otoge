import React, { Component } from "react";
import {
  Dimensions,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import STT from "../components/STT"



export default class Record extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      haveRecordingPermissions: false,
      
    };
    
  }

  render() {
   


    return (
      <View style={styles.container}>
    
         
       <STT />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // alignSelf: "stretch",
    // backgroundColor: red
  },
  
});
