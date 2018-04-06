import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import  { purple } from '../utils/colors'

export default function TextButton ({ children, onPress }) {
    return(
        <TouchableOpacity onPress={onPress}>
            <Text style={{ fontSize: 20, color: purple }} >{children}</Text>
        </TouchableOpacity> 
    )
}