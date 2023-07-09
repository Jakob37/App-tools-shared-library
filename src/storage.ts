import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@catch:entries'

const loadDataFromStorage = async (
  onLoad: (loadedEntries: any[]) => void,
) => {
  try {
    const storedEntries = await AsyncStorage.getItem(STORAGE_KEY)
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

export {STORAGE_KEY, loadDataFromStorage}
