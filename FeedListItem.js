import React from 'react'
import { Text } from 'react-native'

export default class FeedListItem extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Text style={{ fontWeight: 'bold' }} >
          {this.props.title}
          <Text style={{ color: 'grey' }} >
            {this.props.link.url}
          </Text>
        </Text>
      </React.Fragment>
    )
  }
}
