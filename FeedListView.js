import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import FeedListItem from './FeedListItem'

export default class FeedListView extends React.Component {

  _keyExtractor = (item, index) => item.id


  open (e) {
    console.log(e)
    //Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <FlatList
      data={ this.props.items }
      onPress={(e) => console.log('press', e)}
      keyExtractor={this._keyExtractor}
      renderItem={({item}) =>
        <FeedListItem
          title={item.title}
          link={item.links[0]}
        />
      }
      />
    )
  }
}
