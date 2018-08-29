import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { MapView } from 'expo';

import GLOBAL from '../Globals';

class DetailScreen extends Component {
    static navigationOptions = {
        title: '식당정보'
    }
    constructor(props) {
        super(props);

        this.state = {
            info: null,
            token: '',
            imageUri: require('../../../assets/mask.png'),
        }
        let data = props.navigation.state.params;
        if (data !== undefined) {
            //console.log(data);
            this.state = {
                info: data.info,
                token: data.token,
                imageUri: data.info.imageUri,
            }
        }


    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.imageStyle}
                    source={this.state.imageUri}
                />
                <View style={styles.body}>
                    <Text style={styles.header} >{this.state.info.name}</Text>
                    <Text style={styles.address} > {this.state.info.address} </Text>
                    <Text style={styles.description} > {this.state.info.description} </Text>
                </View>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: this.state.info.region.lat,
                        longitude: this.state.info.region.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        );
    }
}
export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    imageStyle: {
        alignSelf: 'stretch',
        height: 160,
        resizeMode: 'cover'
    },
    body: {
        padding: 20
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    address: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
        marginTop: 20,
    }
});