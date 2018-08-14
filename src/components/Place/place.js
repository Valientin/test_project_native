import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { MapView } from 'expo';
import 'core-js/es6/symbol';
import 'core-js/fn/symbol/iterator';
import { computeDistanceBetween } from 'spherical-geometry-js'
import { connect } from 'react-redux';
import { getRoute } from '../../app/actions';
import { CLEAR_ACTIVE_ROUTE } from '../../app/actions/actionTypes';

class PlaceScreen extends React.Component {

    componentDidMount() {
        const itemId = this.props.navigation.getParam('id', 'NO-ID');
        this.props.getRoute(itemId);
    }

    renderPlace = () => {
        const activeRoute = this.props.test.activeRoute;
        const width = Dimensions.get('window').width;
        return Object.keys(activeRoute).length > 1 ?
            <View style={{ flex: 1, width: width }}>
                <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 5 }}>{activeRoute.name}</Text>
                <Text style={{ textAlign: 'center', fontSize: 16, color: '#4c4c4c', marginBottom: 20 }}>{activeRoute.description}</Text>
                <MapView
                    style={{ flex: 1, width: width }}
                    initialRegion={{
                        latitude: activeRoute.route[0].latitude,
                        longitude: activeRoute.route[0].longitude,
                        latitudeDelta: 5,
                        longitudeDelta: 5,
                    }}
                >
                    {activeRoute.route.map(item => (
                        <MapView.Marker key={item.latitude}
                            coordinate={item}
                        />
                    ))}
                    <MapView.Polyline
                        coordinates={[...activeRoute.route]}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={4}
                    />
                </MapView>
                <Text style={{ textAlign: 'center', fontSize: 18, color: '#000' }}>{`Length to place ${activeRoute.length.toFixed(0)}km`}</Text>
            </View>
            : <Text style={{ textAlign: 'center', fontSize: 20 }}>This posts not found in database</Text>
    }

    showEditButton = () => {
        const navigation = this.props.navigation;
        const userId = navigation.getParam('author', 'NO-UserId');
        const itemId = navigation.getParam('id', 'NO-ID');
        let authorRouter = (userId === this.props.test.loginUser) ? true : false;
        return authorRouter ?
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', }}
                onPress={() => navigation.navigate('EditRoute', { id: itemId })}
            >
                <Text style={{ textAlign: 'center', fontSize: 24, color: 'darkblue' }}>Edit Route</Text>
            </TouchableOpacity>
            : <Text style={{ flex: 1, textAlign: 'center', padding: 20, }}>If it is your route - Login for Edit</Text>;
    }

    componentWillUnmount() {
        this.props.clearActiveRoute();
    }


    render() {
        return (
            <View style={styles.container}>
                {this.renderPlace()}
                {this.showEditButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'center',
    },
});


function mapDispatchToProps(dispatch) {
    return {
        getRoute: (id) => dispatch(getRoute(id)),
        clearActiveRoute: () => dispatch({ type: CLEAR_ACTIVE_ROUTE })
    }
}

const mapStateToProps = (state) => {
    return {
        test: state.test
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceScreen)
