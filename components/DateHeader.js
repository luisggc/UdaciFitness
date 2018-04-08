import React from 'react'
import { View, Text } from 'react-native'
import { purple } from '../utils/colors'

export default function DateHeader ({ date }) {
    return(
        <View>
            <Text style={{fontSize: 30, color: purple}}>{date}</Text>
        </View>
    )
}