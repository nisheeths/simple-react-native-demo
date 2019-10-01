/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, StyleSheet, View, Text, Button } from 'react-native'
import {Colors} from 'react-native/Libraries/NewAppScreen';

var DOMParser = require('xmldom').DOMParser;


const parseText = (html) => {
  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(html, 'text/xml');
  var list = htmlDoc.getElementsByTagName('p');
  return list;
}

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {isLoading: true}
  }

  async componentDidMount(){
    try {
      const response = await fetch("http://www.randomtext.me/api/gibberish/p-3/5-10");
      const responseJson = await response.json();
      var list = parseText(responseJson.text_out);
      var data = [];
      Array.from(list).forEach((child) => data.push(child.firstChild.data));
      this.setState({
        isLoading: false,
        dataSource: data,
      }, function () {
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  _onPressButton() {
    //alert('You tapped the button!');
    return fetch("http://www.randomtext.me/api/gibberish/p-7/5-10")
    .then((response) => response.json())
    .then((responseJson) => {      
      var list = parseText(responseJson.text_out);
      console.log(list);  
      var data = [];    
      Array.from(list).forEach((child) => data.push(child.firstChild.data));      
      this.setState({
        isLoading: false,
        dataSource: data,
      }, function(){

      });
    })
    .catch((error) => {console.error(error)});
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1, padding: 20}}>
          <ActivityIndicator />
        </View>
      )
    }

return (     
  <SafeAreaView style={styles.container}>        
        <Text style={styles.heading}> A poem </Text>
        <Text style={styles.text}>Anonymous</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text style={styles.text}>{item}</Text>}
        />
        <View style={styles.bottom}>
          <Button
            style={styles.button}
            title= 'Test' onPress={this._onPressButton.bind(this)} />
        </View>
  </SafeAreaView>     
  );
};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  image: {
    marginTop: 50
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 2,
    color: Colors.dark,
    fontSize: 24
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
});
