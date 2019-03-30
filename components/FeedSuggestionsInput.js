import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import AutoComplete from 'react-native-autocomplete-input'
import Store from './Store'

const styles = StyleSheet.create({
  autoComplete: {
    height: 40,
    borderStyle: 'none',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderBottomColor: '#CCC'
  },
  suggestion: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2
  }
})

export default class FeedSuggestionsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feeds: []
    }
  }

  updateFeeds(feeds) {
    this.setState({ feeds })
  }

  componentDidMount() {
    Store.load().then(this.updateFeeds.bind(this))
  }

  getFeedsSuggestions(feeds, feed) {
    if (!feed || !feed.length) return
    return (feeds || []).filter(f => f !== feed && f.startsWith(feed))
  }

  render() {
    const { feed } = this.props
    const { feeds } = this.state
    return (
      <AutoComplete
        style={{ ...styles.autoComplete }}
        data={this.getFeedsSuggestions(feeds, feed)}
        autoCapitalize="none"
        autoFocus={true}
        defaultValue={feed}
        onChangeText={feed => this.props.onChangeText(feed.toLowerCase())}
        placeholder="Feed name"
        renderItem={feed => (
          <TouchableOpacity onPress={() => this.props.onChangeText(feed)}>
            <Text style={{ ...styles.suggestion }}>{feed}</Text>
          </TouchableOpacity>
        )}
      />
    )
  }
}
