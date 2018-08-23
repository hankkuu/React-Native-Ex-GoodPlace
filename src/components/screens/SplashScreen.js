import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { NavigationActions } from 'react-navigation';

class Splashscreen extends Component {
    static navigationOptions = {
        title: null,
        header: null
    }

    componentDidMount() {
        setTimeout(() => {
            // 스택이동의 히스토리를 리셋해주는 방법 dispatch 매서드 이용
            this.props.navigation.dispatch(
                {
                    type: 'Navigation/RESET',
                    index: 0,
                    actions: [{ routeName: 'Login'}]
                }
            )
        }, 500);
    }

    render() {
        const text = '맛집';
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} >
                    <Image style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover' }}
                           source={require('../../../assets/background.png')}
                    >                           
                    </Image>
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparent'}}>
                    <Text style={{ textAlign: 'center', fontSize: 40, marginTop: 100, color: '#fff3f1'}}>{text}</Text>
                </View>
            </View>
        );
    }
}
export default Splashscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});