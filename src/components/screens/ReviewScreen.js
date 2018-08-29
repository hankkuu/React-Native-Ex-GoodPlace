import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    TouchableHighlight,
    Dimensions,
    ScrollView
} from "react-native";
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import uuidv1 from "uuid/v1";
import GLOBAL from '../Globals';

const { height, width } = Dimensions.get("window");

global.dummyData = [
    { id: uuidv1(), title: '맜있어요', rating: '5' },
    { id: uuidv1(), title: '별로에요', rating: '3' },
    { id: uuidv1(), title: '그냥그래', rating: '1' }
]

class ReviewScreen extends Component {
    static navigationOptions = {
        title: '리뷰'
    }
    constructor(props) {
        super(props);

        this.state = {
            info: '',
            token: '',
            modalVisible: false,
            score: '',
            reviews: [...global.dummyData]
        }
    }
    componentDidUpdate() {

    }

    componentDidMount() {
        this.fetchData();
        let data = this.props.navigation.state.params;
        if (data !== undefined) {
            this.setState({
                info: data.info,
                token: data.token
            });
        }
    }

    fetchData() {
        const data = {
            id: this.state.info.id
        };

        const url = GLOBAL.HOST + '/mobile/reviews?id=' + this.state.info.id + '&token=' + encodeURIComponent(this.state.token);


        fetch(url)
            .then((Response) => response.json())
            .then((responseJson) => {
                this.setState(state => ({
                    reviews: [...responseJson]
                }));
            })
            .catch((error) => {
                //console.log(error);
                this.setState(state => ({
                    reviews: [...global.dummyData]
                }));
            });
    }

    renderEntries = ({ item, index }) => {
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

        console.log(this.state.modalVisible);
        return (
            <View style={styles.container}>

                <FlatList
                    style={styles.list}
                    data={this.state.reviews}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this.renderEntries}
                />

                <ActionButton buttonColor="rgba(231,76,60,1)">
                    {/* <ActionButton.Item buttonColor='#9b59b6' title="Done" onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                        </ActionButton.Item> */}
                    <ActionButton.Item buttonColor='#3498db' title="New" onPress={() => { this._onAddButtonClick() }}>
                        <Ionicons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Don't close modal"); }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <TextInput style={styles.input} placeholder={"Input score"}
                                value={this.state.score}
                                onChangeText={this._onChangeScore}
                                placeholderTextColor={"#999"}
                                returnKeyType={"done"}
                                autoCorrect={false}
                                onSubmitEditing={this._addScore}
                                // multiline={true}
                                underlineColorAndroid={"transparent"} >
                            </TextInput>

                            <TouchableHighlight
                                onPress={this._donePress}>
                                <Ionicons name="md-create" style={styles.doneButton}>done</Ionicons>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }

    _donePress = () => {
        this._setModalVisible(!this.state.modalVisible);
        const { score } = this.state;
        if (score !== "") {
            this._addScore();
        }
    }

    _onAddButtonClick = () => {
        this._setModalVisible(true);
    }

    _onChangeScore = (s) => {
        this.setState({ score: s })
    }

    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
    }

    _addScore = () => {
        const { score, reviews } = this.state;
        //console.log(reviews);
        if (score !== "") {
            const newReview = { id: uuidv1(), title: score, rating: '5' }
            global.dummyData.push(newReview);
            this.setState({
                reviews: global.dummyData
            })
        }
    }
}
export default ReviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FcFF',
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
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    input: {
        padding: 20,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 25,
    },
});