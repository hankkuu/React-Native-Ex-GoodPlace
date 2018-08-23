import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from "react-native";

import GOBAL from '../Globals';

class LoginScreen extends Component {
    static navigationOptions = {
        title: null,
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }
    
    async getToken() {
        try {
            // getItem이 끝날 때까지 await 한다는 것 기다리는 것
            // 값을 제대로 받아와야 토큰에 넣어 준다 
            // await를 사용하면 async를 같이 패턴적으로 쓴다
            const token = await AsyncStorage.getItem("@Session:token");
            console.log("Token: " + token);

            // 자동로그인 한다...
            if(token !== null) {
                this.props.navigation.dispatch({
                    type: 'Navigation/RESET',
                    index: 0,
                    actions: [{ routeName: 'List'}]
                })
            }
           
        } catch(error) {

        }
    }

    componentDidMount() {
        this.getToken();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} >
                    <Image style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover' }}
                           source={require('../../../assets/background.png')}
                    >                           
                    </Image>
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparent', padding: 20, justifyContent: 'center'}}>
                    <View style={styles.formBorderStyle}>
                        <TextInput style={styles.formFieldStyle}
                                   placeholder='이메일'
                                   keyboardType="email-address"
                                   underlineColorAndroid='transparent'
                                   onChangeText={(account) => this.setState({account}) }
                        ></TextInput>
                    </View>
                    <View style={styles.formBorderStyle}>
                        <TextInput style={styles.formFieldStyle}
                                   placeholder='비밀번호'
                                   secureTextEntry={true}
                                   underlineColorAndroid='transparent'
                                   onChangeText={(password) => this.setState({password}) }
                        ></TextInput>
                    </View>
                    <TouchableOpacity style={styles.formButtonStyle} onPress={this.onLogin.bind(this)}>
                        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold' }} >로그인</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.formFacebookStyle} onPress={this.onFacebook.bind(this)}>
                        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold' }} >페이스북 로그인</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
    }

    onLogin() {
        console.log("onLogin");
        var ret = { success: true, token: 'success' }
        this.onLoginResult(ret);

        // 원래는 아래와 같은 방법으로 해야 함
        // let formData = new FormData();
        // formData.append('account', this.state.account);
        // formData.append('password', this.state.password);

        // fetch(GOBAL.HOST + 'mobile/login', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     this.onLoginResult(responseJson);
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }

    onFacebook() {
        console.log("onFacebook");
        const self = this;
        // 아래에 필요한 내용을 넣는다 expo 문서 참조 또는 (native 방식)
        var ret = { success: true, token: 'success' }
        self.onLoginResult(ret);
    }

    onLoginResult(result) {
        console.log(result);
        if(!result.success) {
            alert('로그인정보를 확인해라');
            return;
        }
        // 세션 토큰을 사용하면 앱을 계속 로그인 하고 할 수 있다 

        try {
            AsyncStorage.setItem('@Session:token', result.token);
            
        } catch (error) {
            alert('로그인에 실패했습니다')
        }

        this.props.navigation.dispatch({
            type: 'Navigation/RESET',
            index: 0,
            actions: [{ routeName: 'List'}]
        })
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    formBorderStyle: {
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        margin: 5,
    },
    formFieldStyle: {
        height: 50,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    formButtonStyle: {
        backgroundColor: 'black',
        height: 50,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5,
        marginTop: 15,
    },
    formFacebookStyle: {
        backgroundColor: '#4267B2',
        height: 50,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5,
        marginTop: 10,
    }
});