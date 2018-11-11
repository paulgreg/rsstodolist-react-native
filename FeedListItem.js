import React from 'react'
import { Text, Linking } from 'react-native'

export default class FeedListItem extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Text style={{ fontWeight: 'bold' }}>
          {this.props.title} -
          <Text
            style={{ color: 'grey' }}
            onPress={() => Linking.openURL(this.props.link.url)}
          > {this.props.link.url} </Text>
        </Text>
      </React.Fragment>
    )
  }
}
