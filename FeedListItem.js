import React from 'react'
import { Text, Linking, Clipboard, ToastAndroid } from 'react-native'

export default class FeedListItem extends React.Component {

  copy (value) {
    Clipboard.setString(value);
    ToastAndroid.show('Text copied!', ToastAndroid.SHORT);
  }

  render() {
    return (
      <React.Fragment>
        <Text style={{ fontWeight: 'bold' }} onLongPress={ this.copy.bind(this, `${this.props.title} ${this.props.link.url}`) }>
          {this.props.title} -
          <Text
            style={{ color: 'grey' }}
            onPress={() => Linking.openURL(this.props.link.url)}
            onLongPress={ this.copy.bind(this, this.props.link.url) }>
          > {this.props.link.url} </Text>
        </Text>
      </React.Fragment>
    )
  }
}
