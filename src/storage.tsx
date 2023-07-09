import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'

const StorageContext = React.createContext<{
  entries: Object[]
  saveEntries: (entries: Object[]) => void
}>({
  entries: [],
  saveEntries: _entries => {
    console.error('This placeholder should not be called')
  },
})

interface DataProviderProps {
  children: React.ReactNode
}

const StorageProvider: React.FC<DataProviderProps> = (
  props: {
    storage_key: string
  },
  { children },
) => {
  const [entries, setEntries] = useState<Object[]>([])

  // Load data from async storage
  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(props.storage_key)
      if (storedData) {
        setEntries(JSON.parse(storedData))
      }
    } catch (error) {
      console.log('Error retrieving data from async storage:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const saveEntries = async (updatedData: Object[]) => {
    try {
      await AsyncStorage.setItem(props.storage_key, JSON.stringify(updatedData))
      setEntries(updatedData)
    } catch (error) {
      console.log('Error saving data to async storage', error)
    }
  }

  return (
    <StorageContext.Provider value={{ entries, saveEntries }}>
      {children}
    </StorageContext.Provider>
  )
}

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

export { loadDataFromStorage, StorageProvider }
