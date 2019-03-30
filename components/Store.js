import { AsyncStorage } from 'react-native'

const FEEDS_KEY = '@rsstodolist:feeds'
let feeds = []

export default class Store {
  static load() {
    return AsyncStorage.getItem(FEEDS_KEY).then(result => {
      feeds = JSON.parse(result) || []
      console.log('load', feeds)
      return feeds
    })
  }
  static save(feed) {
    if (feeds.indexOf(feed) === -1) {
      feeds = [...feeds, feed]
      console.log('save', feeds)
      return AsyncStorage.setItem(FEEDS_KEY, JSON.stringify(feeds))
    }
  }
}
