import { View, Text, Image } from 'react-native'
import React from 'react'
import animalImages from '../graphics/animals'

export default function AnimalCard({animal}) {
  return (
    <View>
      <Text>{animal.name}</Text>
      <Image  style={{width: 150, height: 150}} source={animalImages[animal.name]}/>
    </View>
  )
}