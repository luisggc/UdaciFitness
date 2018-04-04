import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextButton ({ children, onPress }) {
    return(
        <TouchableOpacity style={style} onPress={onPress}>
            <Text>{children}</Text>
        </TouchableOpacity> 
    )
}

const style = StyleSheet.create({
    margin:0
})