import config from './config.json'
import React from 'react'
import { StyleSheet, Text, TextInput, Button, View } from 'react-native'
import * as rssParser from 'react-native-rss-parser'
import FeedListView from './FeedListView'
import renderIf from './renderIf'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 20,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  go () {
    if (!this.state.feed) {
      this.setState({error: 'No feed name'})
      return
    }
    this.setState({ error: undefined })

    return fetch(`${config.server}?n=${this.state.feed}&l=100`)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        const items = rss.items.map((item, idx) => {
          return { ...item, id: `${this.state.feed}-${idx}` }
        })
        this.setState({items})
      })
  }

  add () {
  }

  del () {
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.text, height: 20, fontWeight: 'bold', backgroundColor: 'steelblue'}}></Text>
        <Text style={{ ...styles.text, height: 60, fontSize: 16, backgroundColor: 'steelblue'}}>rsstodolist - {config.server}</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Feed name"
          value={this.state.feed}
          onChangeText={(feed) => this.setState({feed: feed.toLowerCase()})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
        />
        <Button
          onPress={this.go.bind(this)}
          title="Go"
          color="#841584"
        />
        <Button
          onPress={this.add.bind(this)}
          title="Add"
          color="#5FBA7D"
        />
        <Button
          onPress={this.del.bind(this)}
          title="Delete"
          color="#F63136"
        />
      {renderIf(this.state.error,
        <Text style={{ ...styles.text, height: 60, backgroundColor: 'red'}}>{this.state.error}</Text>
      )}
        <FeedListView items={ this.state.items } />
      </View>
    )
  }
}

