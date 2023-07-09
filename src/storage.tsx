import AsyncStorage from '@react-native-async-storage/async-storage'
import React = require('react')

const loadDataFromStorage = async (
  storage_key: string,
  onLoad: (loadedEntries: any[]) => void,
) => {
  try {
    const storedEntries = await AsyncStorage.getItem(storage_key)
    if (storedEntries !== null) {
      const currArray = JSON.parse(storedEntries)
      onLoad(currArray)
    } else {
      console.log('No data found')
    }
  } catch (error) {
    console.log('Error loading from storage', error)
  }
}

export { loadDataFromStorage }
