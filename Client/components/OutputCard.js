
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const OutputCard = (data) => {
  return (
    <View>
<Text>{data.key}</Text>
<Text>{data.value}</Text>

    </View>
  )
}

export default OutputCard