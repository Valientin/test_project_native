import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView } from 'expo';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import { computeDistanceBetween } from 'spherical-geometry-js'
import { connect } from 'react-redux';
import { addRoute } from '../../app/actions';

class AddRoute extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      categories: '',
      markers: [],
      newMarker: {},
      distance: 0
    }
  }

  handleAddRoute = () => {
    const newRoute = {
      id: this.props.test.routes.length + 1,
      name: this.state.name,
      categoryId: this.state.categories,
      description: this.state.description,
      userId: this.props.test.loginUser,
      length: this.state.distance,
      route: this.state.markers
    }
    this.props.addRoute(newRoute);
    this.props.navigation.navigate('Home');
  }

  computeLength(markers) {
    let distance = 0;
    for (i = 0; i < markers.length-1; i++) {
      distance += computeDistanceBetween({
        lat: markers[i].latitude,
        lng: markers[i].longitude
      }, {
        lat: markers[i+1].latitude,
        lng: markers[i+1].longitude
      })
    }
    return distance;
  }

  onLongPressHandler(coordinate) {
    let distance = 0;
    if (this.state.markers.length != 0) {
        distance = this.computeLength([...this.state.markers, {latitude: coordinate.latitude, longitude: coordinate.longitude}])
    }
    this.setState(prevState => ({
      markers: [...prevState.markers, { latitude: coordinate.latitude, longitude: coordinate.longitude }],
      distance: distance
    }));
  }

  onPressMarkerHandler(coordinate) {
    let distance = 0;
    if (this.state.markers.length > 1) {
      distance = this.computeLength(this.state.markers.filter(marker => (marker.latitude !== coordinate.latitude) && (marker.longitude !== coordinate.longitude)))
    }
    this.setState(prevState => ({
      markers: prevState.markers.filter(marker => (marker.latitude !== coordinate.latitude) && (marker.longitude !== coordinate.longitude)),
      distance: distance
    }));
  }
 
  render() {
    const width = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        <View style={styles.linearLayout}>
          <Text style={styles.title}>ADD ROUTE</Text>
          <TextInput 
            value={this.state.name} 
            onChangeText={(text) => this.setState({name: text})} 
            style={styles.textInput} 
            placeholder='Name Route' 
          />
          <TextInput 
            value={this.state.description} 
            onChangeText={(text) => this.setState({description: text})} 
            style={styles.textInput} 
            placeholder='Description Route' 
          />
          <Picker
            selectedValue={this.state.categories}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.setState({categories: itemValue})}
          >
            <Picker.Item label="Footer" value="1" />
            <Picker.Item label="Velo" value="2" />
            <Picker.Item label="Another" value="3" />
          </Picker>
          <MapView
            style={{ flex: 1, width: width }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
            onLongPress={(e) => this.onLongPressHandler(e.nativeEvent.coordinate)}
          >
            {this.state.markers.map(item => (
              <MapView.Marker key={item.latitude}
                coordinate={item}
                onPress={(e) => this.onPressMarkerHandler(e.nativeEvent.coordinate)}
              />
            ))}
            <MapView.Polyline
              coordinates={[...this.state.markers]}
              strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={4}
            />
          </MapView>
          <Text style={{fontSize: 20, textAlign: 'center', padding: 20}}>
            {`Length Route - ${this.state.distance.toFixed(0)}km`}
          </Text>
          <Button 
            title="Add Route" 
            onPress={() => this.handleAddRoute()}
            containerViewStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
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
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10
  },
  textInput: {
    padding: 10,
  }
});

function mapDispatchToProps(dispatch){
  return {
    addRoute: (obj) => dispatch(addRoute(obj)),
  }
}

const mapStateToProps = (state) => {
  return {
    test: state.test
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddRoute)