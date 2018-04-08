import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import EntryDetails from  './components/EntryDetails'

const UdaciStatusBar = () => (
    <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }}>
      <StatusBar translucent barStyle='light-content' />
    </View>
)

const Tabs = TabNavigator({
  Home: {
    screen: History,
  },
  Dashboard: {
    screen: AddEntry
  }},
  {
    navigationOptions: {
      header: null
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