/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import api from './Utils/api'
import FBSDK from 'react-native-fbsdk';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';


const {
  LoginButton,
} = FBSDK;




const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ShoppingAssistant extends Component {


  constructor(){
    super();
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }


  componentWillMount(){

    api.getData().then( (res) => {
      console.log(res);
      this.state = {
        dataSource: ds.cloneWithRows(res)
      };

    }).catch((error) => {
      console.log("Api call error", error.message);
      alert(error.message);
    });
  }

  render() {

    return (
      <View style={{flex:1}}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  view: {
    padding:50
  },
  list: {
    flex: 1,
    padding: 30,
    backgroundColor: 'rgb(39, 174, 96)'
  },
  text: {
    fontSize: 20,
    color: 'white'
  }

})




AppRegistry.registerComponent('ShoppingAssistant', () => ShoppingAssistant);
