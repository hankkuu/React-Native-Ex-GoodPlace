import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    AsyncStorage,
    Image
} from "react-native";
import uuidv1 from "uuid/v1";
import GLOBAL from '../Globals';

class ListScreen extends Component {
    static navigationOptions = {
        title: null,
        header: null
    }
    constructor(props) {
        super(props)
        // 아래의 경우 전역 변수로 사용 가능 (global)
        global.token = '';

        this.state = {
            region: this.getRegionInitalState(),
            spots: [
                { id: 0, name: '데이터 로딩 중' }
            ],
            error: null,
            token: '',
            refreshing: false,
            // 새로고침을 했을 때 중복되지 않도록 
        }
        // 이렇게도 콜백함수를 등록할 수 있다...
        this.onPressItem = this.onPressItem.bind(this);
    }

    componentDidMount() {
        this.getToken();
        this.loadLocation();
    }

    async getToken() {
        try {
            // getItem이 끝날 때까지 await 한다는 것 기다리는 것
            // 값을 제대로 받아와야 토큰에 넣어 준다 
            // await를 사용하면 async를 같이 패턴적으로 쓴다
            const token = await AsyncStorage.getItem("@Session:token");
            console.log("Token: " + token);
            this.setState({token: token})
        } catch(error) {

        }
    }

    loadLocation() {
        var options = {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 1000,
            distanceFilter: 10,
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    },
                    error: null
                })
                console.log(position);
                // 여기서 강제로 일단 만들자
                this.fetchData();
            },
            (error) => {
                this.setState({
                    error: error.message
                });
                this.fetchData();
            },
            options
        );
    }

    fetchData() {
        const data = {
            lat: this.state.region.latitude,
            lng: this.state.region.longitude
        };
        // 토큰을 get 방식으로 보낼 때 인코드 함수로 감싸서 보낸다
        const url = GLOBAL.HOST + 'mobile/list?lat=' + data.lat + '&lng' + data.lng + '&token' + encodeURIComponent(this.state.token);
        let dummyData = [
            {id: uuidv1(), name: '고요남', imageUri: require('../../../assets/goyonam.png'), address: '경기 성남시 분당구 판교역로192번길 12', description: '회식장소', region: data},
            {id: uuidv1(), name: '선순대', imageUri: require('../../../assets/sunsundae.png'), address: '경기 성남시 분당구 판교역로 240', description: '저녁식사', region: data},
            {id: uuidv1(), name: '우리포석정', imageUri: require('../../../assets/wooriposukjung.png'), address: '경기 성남시 분당구 분당내곡로 151', description: '회식장소', region: data}
        ]

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(state => ({
                    spots: [...responseJson]                    
                }));
            })
            .catch((error) => {
                console.log("여기들어온거 맞음?");
                console.log(error);
                this.setState(state => ({                   
                    spots: [...dummyData]
                }));
            });
    }

    getRegionInitalState() {
        return {
            latitude: 37566535,
            longitute: 126.9779691,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    }

    onPressItem(item) {
        this.props.navigation.navigate('Restaurant', {info: item, token: this.state.token});
    }

    onRefresh() {
        // 위치가 변하면 리스트를 새로 읽어 온다 
        this.loadLocation();
    }

    renderEntries({ item, index }) {
        //if (item.image != null && item.image.length > 0) {
        if (item.imageUri != null ) {
            console.log("아이템 발견");
            //const imageUri = GLOBAL.HOST + item.image[0].uri;
            // 다른 방식으로 더미를 넘겨야 한다 

            return (
                <TouchableOpacity
                    style={styles.itemStyle}
                    onPress={() => this.onPressItem(item)}
                >
                    <View style={styles.itemContainerStyle}>
                        <Image
                            style={styles.itemImageStyle}
                            source={ item.imageUri }
                        />
                        <Text style={styles.itemTextStyle} >
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }

        console.log("아이템없다");
        return (
            <TouchableOpacity style={styles.itemStyle} >
                <Text style={styles.itemTextStyle}>
                    {item.name}
                </Text>
            </TouchableOpacity>
            )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>스마일 게이트 맛집 리스트</Text>
                <FlatList
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    style={styles.list}
                    data={this.state.spots}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this.renderEntries.bind(this)}
                />
            </View>
        );
    }
}
export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FcFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        marginTop: 30
    },
    list: {
        alignSelf: 'stretch'
    },
    itemStyle: {
        padding: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 80,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    itemContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    itemImageStyle: {
        width: 80,
        height: 80
    }
});