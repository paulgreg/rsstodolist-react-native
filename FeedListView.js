import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import FeedListItem from './FeedListItem'

export default class FeedListView extends React.Component {

  _keyExtractor = (item, index) => item.id

  render() {
    return (
      <FlatList
      data={ this.props.items }
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
