import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { getAllUsers, getAllRoutes } from '../../app/actions';

class HomeScreen extends React.Component {

  componentDidMount() {
    if (this.props.test.routes.length <= 0){
      this.props.getAllRoutes();
    }
    if(this.props.test.users.length <= 0) {
      this.props.getAllUsers();
    }
  }

  showFlatList = () => {
    const { navigate } = this.props.navigation;
    return this.props.test.routes.length >= 1 ?
      <FlatList
        data={this.props.test.routes}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{}}
            onPress={() => navigate('Place', {id: item.id, author: item.userId})}
          >
            <View style={styles.itemList}>
              <Text style={styles.itemListTitle}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        // keyExtractor={(item, index) => index}
      />
    : null
  }

  showHomeButton = () => {
    const { navigate } = this.props.navigation;
    return this.props.test.loginUser ? 
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center',}}
        onPress={() => navigate('AddRoute')}
      >
        <Text style={{textAlign: 'center', fontSize: 24, color: 'darkblue'}}>Add Route</Text>
      </TouchableOpacity>
    :
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center',}}
        onPress={() => navigate('LoginOrRegister')}
      >
        <Text style={{textAlign: 'center', fontSize: 24, color: 'darkblue'}}>Login / Register</Text>
      </TouchableOpacity>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.showFlatList()}
        {this.showHomeButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  itemList: {
    flex: 1,
    padding: 15,
    paddingHorizontal: 25,
    backgroundColor: '#b5ffc5',
    marginBottom: 5, 
  },
  itemListTitle: {
    fontSize: 20,
    color: '#4c4c4c'
  }
});

function mapDispatchToProps(dispatch){
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    getAllRoutes: () => dispatch(getAllRoutes())
  }
}

const mapStateToProps = (state) => {
  return {
    test: state.test
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)