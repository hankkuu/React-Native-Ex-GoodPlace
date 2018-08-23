
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import ReviewScreen from '../screens/ReviewScreen';

import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'

const TabSceneNavigator = createMaterialTopTabNavigator({
    tab1: { screen: DetailScreen },
    tab2: { screen: ReviewScreen }
})

export default GourmetApp = createStackNavigator({
    Index: { screen: SplashScreen },
    Login: { screen: LoginScreen },
    List: { screen: ListScreen },
    Restaurant: {
        screen: TabSceneNavigator
    }
});

