var React = require('react-native');
var Profile = require('./Profile');
var Repositories = require('./Repositories');
var api = require('../Utils/api');

var {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} = React;


var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
})

class Dashboard extends React.Component{

  makeBackground(page) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    switch (page) {
      case "profile":
        obj.backgroundColor = '#48bbec';
        break;
      case "repos":
        obj.backgroundColor = '#e77aae';
        break;
      default:
        obj.backgroundColor = '#758bf4';
        break;
    }

    console.log(obj)

    return obj;
  }

  goToProfile() {
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: {userInfo: this.props.userInfo}
    })
  }

  goToRepos() {
    api.getRepos(this.props.userInfo.login)
      .then((res) => {
        this.props.navigator.push({
          component: Repositories,
          title: 'Repositories',
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        })
      })
  }

  goToNotes() {
    console.log("Notes")
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}></Image>

        <TouchableHighlight
          style={this.makeBackground("profile")}
          onPress={this.goToProfile.bind(this)}
          underlayColor="#88d4f5">
            <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground("repos")}
          onPress={this.goToRepos.bind(this)}
          underlayColor="#88d4f5">
            <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground("notes")}
          onPress={this.goToNotes.bind(this)}
          underlayColor="#88d4f5">
            <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>
      </View>
    )
  }
}


module.exports = Dashboard;
