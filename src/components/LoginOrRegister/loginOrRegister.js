import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { registerUser } from '../../app/actions';
import { LOGIN_USER } from '../../app/actions/actionTypes';


class LoginOrRegister extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    }
  }

  onRegister() {
    let uniqEmail = true;
    this.props.test.users.map((item) => {
      if(item.email === this.state.login){
        uniqEmail = false;
      }
    });
    if((this.state.login !== '') && (this.state.password !== '') && uniqEmail){
      const newUser = {
        id: this.props.test.users.length + 1,
        email: this.state.login,
        password: this.state.password
      }
      this.props.registerUser(newUser)
    }
    this.setState({
      login: '', 
      password: ''
    })
  }

  onLogin() {
    let email = false;
    let password = false;
    this.props.test.users.map((item) => {
      if(item.email === this.state.login){
        email = true;
        if(item.password === this.state.password){
          alert('You are login!')
          this.props.loginUser(item.id);
          this.props.navigation.navigate('Home')
        } else {
          alert('Password is wrong!')
        }
      } else {
        alert('Email is wrong!')
      }
    })
    this.setState({
      login: '', 
      password: ''
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.linearLayout}>
          <Text style={styles.title}>LOGIN \ REGISTER</Text>
          <TextInput 
            value={this.state.login} 
            onChangeText={(text) => this.setState({login: text})} 
            style={styles.textInput} 
            placeholder='Login or email' 
          />
          <TextInput 
            value={this.state.password} 
            onChangeText={(text) => this.setState({password: text})}
            style={styles.textInput} 
            placeholder='Password' secureTextEntry 
          />
          <Button
            title="LOGIN"
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              marginTop: 10
            }}
            onPress={() => this.onLogin()} 
          />
          <Button 
            title="REGISTER" 
            onPress={() => this.onRegister()}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              marginTop: 15
            }}
          />
        </View>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  linearLayout: {
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  textInput: {
    padding: 10,
  },
  login: {
    backgroundColor: 'red',
    paddingBottom: 10
  }
});


function mapDispatchToProps(dispatch){
  return {
    loginUser: (id) => dispatch({type: LOGIN_USER, payload: id}),
    registerUser: (obj) => dispatch(registerUser(obj))
  }
}


const mapStateToProps = (state) => {
  return {
    test: state.test
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister)