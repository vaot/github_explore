var React = require('react-native');
var Badge = require('./Badge');

var {
  Text,
  View,
  StyleSheet,
  ScrollView
} = React;


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
})


class Profile extends React.Component{
  render() {
    var topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
    var userInfo = this.props.userInfo;
    var list = topicArr.map((item, index) => {
      if(!userInfo[item]){
        return <View key={index}/>
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {item} </Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
            </View>
          </View>
        )
      }
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo}/>
        {list}
      </ScrollView>
    )
  }
}

Profile.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}


module.exports = Profile;
