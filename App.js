import config from './config.json'
import React from 'react'
import { StyleSheet, Text, TextInput, Button, View, ActivityIndicator, Keyboard } from 'react-native'
import * as rssParser from 'react-native-rss-parser'
import FeedListView from './FeedListView'
import renderIf from './renderIf'

const height = 40

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
  },
  textInput: {
    flex: 2,
    padding: 4,
    height,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderBottomColor: '#CCC',
  },
  button: {
    height,
    flex: 1,
  },
  row: {
    padding: 4,
    flexDirection: 'row',
  },
  column: {
    flex: 2,
    padding: 4,
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
    if (!this.checkFeedName()) return

    Keyboard.dismiss()

    this.setState({
      title: undefined,
      items: undefined,
      loading: true
    })

    return fetch(`${config.server}?n=${this.state.feed}&l=100`)
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        const items = rss.items.map((item, idx) => {
          return { ...item, id: `${this.state.feed}-${idx}` }
        })
        this.setState({
          title: rss.title,
          items,
          loading: undefined,
        })
      })
      .catch((e) => {
        this.setState({
          error: e,
          loading: undefined,
        })
      })
  }

  add () {
    this.do('add', 'added')
  }

  del () {
    this.do('del', 'deleted')
  }

  do (action, verb) {
    if (!this.checkFeedName() || !this.checkUrl()) return

    Keyboard.dismiss()

    this.setState({
      msg: undefined,
      error: undefined,
      title: undefined,
      items: undefined,
      loading: true,
    })

    return fetch(`${config.server}${action}}?n=${this.state.feed}&u=${this.state.url}`)
    .then(() => {
      this.showMessage(`URL ${verb} to feed ${this.state.feed}`)
      this.go()
    })
    .catch(e => {
      this.showError(e)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ ...styles.text, height: 20, backgroundColor: 'steelblue'}}></Text>
        <Text style={{ ...styles.text, height: 60, fontWeight: 'bold', color: 'white', fontSize: 16, backgroundColor: 'steelblue'}}>rsstodolist - {config.server}</Text>
        <View style={{ ...styles.row }}>
          <TextInput
            style={{ ...styles.textInput }}
            autoCapitalize="none"
            autoFocus={ true }
            placeholder="Feed name"
            value={this.state.feed}
            onChangeText={(feed) => this.setState({feed: feed.toLowerCase()})}
          />
          <Button
           style={{ ...styles.button }}
            onPress={this.go.bind(this)}
            title="Go"
            color="steelblue"
          />
          <Button
           style={{ ...styles.button }}
            onPress={this.add.bind(this)}
            title="Add"
            color="#5FBA7D"
          />
          <Button
           style={{ ...styles.button }}
            onPress={this.del.bind(this)}
            title="Del"
            color="#F63136"
          />
        </View>
        <View style={{ ...styles.row }}>
          <TextInput
            style={{ ...styles.textInput }}
            autoCapitalize="none"
            keyboardType="url"
            placeholder="URL"
            onChangeText={(url) => this.setState({url})}
          />
        </View>
        <View style={{ ...styles.column}}>
          {renderIf(this.state.msg,
          <Text style={{ ...styles.text, height: 60, backgroundColor: 'green'}}>{this.state.msg}</Text>
          )}
          {renderIf(this.state.error,
          <Text style={{ ...styles.text, height: 60, backgroundColor: 'red'}}>{this.state.error}</Text>
          )}
          {renderIf(this.state.loading,
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
          )}
          {renderIf(this.state.title,
          <Text style={{ ...styles.text, height: 30, backgroundColor: '#CCC'}}>Feed : {this.state.title}</Text>
          )}
          <FeedListView items={ this.state.items } />
        </View>
      </View>
    )
  }

  checkFeedName () {
    if (!this.state.feed) {
      this.showError('no feed name')
      return false
    }
    return true
  }

  checkUrl () {
    if (!this.state.url) {
      this.showError('no URL')
      return false
    }
    const urlRe = /^https?:\/\//
    if (!urlRe.test(this.state.url)) {
      this.showError('Bad URL')
      return false
    }

    return true
  }

  showMessage(msg) {
    this.show('msg', msg)
  }
  showError(msg) {
    this.show('error', msg)
  }

  show(key, msg) {
    ['msg', 'error'].map(m => this.emptyMessage(m))
    this.setState({[key]: msg})
    this.delay(this.emptyMessage.bind(this, key))
  }

  emptyMessage(key) {
    this.setState({ [key]: undefined })
  }

  delay(fn) {
    setTimeout(fn, 3500)
  }

}

