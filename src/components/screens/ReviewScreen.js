import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";
import uuidv1 from "uuid/v1";
import GLOBAL from '../Globals';

class ReviewScreen extends Component {
    static navigationOptions = {
        title: '리뷰'
    }
    constructor(props) {
        super(props);

        this.state = {
            info: '',
            token: '',
            reviews: [
                { id: 0, name: '데이터 로딩 중' }
            ]
        }

        let data = props.navigation.state.params;
        if( data !== undefined ) {            
            this.state = {
                info: data.info,
                token: data.token
            }
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const data = {
            id: this.state.info.id
        };

        const url = GLOBAL.HOST + '/mobile/reviews?id=' + this.state.info.id + '&token=' + encodeURIComponent(this.state.token);
        let dummyData = [
            {id: uuidv1(), title: '맜있어요', rating: '5'},
            {id: uuidv1(), title: '별로에요', rating: '3'},
            {id: uuidv1(), title: '그냥그래', rating: '1'}
        ]

        fetch(url)
            .then((Response) => response.json())
            .then((responseJson) => {
                this.setState(state => ({
                    reviews: [...responseJson]
                }));
            })
            .catch((error) => {
                console.log(error);
                this.setState(state => ({
                    reviews: [...dummyData]
                }));
            });
    }

    renderEntries({ item, index }) {
        return (
            <TouchableOpacity
                style={styles.itemStyle}
            >
                <View style={styles.itemContainerStyle}>
                    <Text style={styles.itemTextStyle}> {item.title} </Text>
                    <Text> {item.rating} / 5 </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={this.state.reviews}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this.renderEntries.bind(this)}
                />
            </View>
        );
    }
}
export default ReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FcFF'
    },
    list: {
        alignSelf: 'stretch'
    },
    itemContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    itemStyle: {
        padding: 0,
        alignSelf: 'stretch',
        alignItems: 'center',
        height: 80,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    itemTextStyle: {
        fontSize: 18,
        padding: 25
    }
});