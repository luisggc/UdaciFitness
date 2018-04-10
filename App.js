import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import Live from './components/Live'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import EntryDetails from  './components/EntryDetails'
import { setLocalNotification } from './utils/helpers'

const UdaciStatusBar = () => (
    <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }}>
      <StatusBar translucent barStyle='light-content' />
    </View>
)

const Tabs = TabNavigator({
    Live:{
      screen: Live
    },
    Home: {
      screen: History
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add entry',
      }
    },
    }, {
      navigationOptions: {
        header: null
      },
      tabBarOptions: {
        activeTintColor: white,
        style: {
          height: 56,
          backgroundColor: purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }
    }
  )

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetails: {
    screen: EntryDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)} >
        <View style={{flex : 1}}>
          <UdaciStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}