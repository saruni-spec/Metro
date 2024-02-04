import React from 'react'
import { View,TextInput } from 'react-native-web'

const Booking = () => {
  return (
    <View>
        <View>
            <TextInput
                placeholder="from"
                
            />
            <TextInput
                placeholder="To:"
            />
        </View>
    </View>
  )
}

export default Booking