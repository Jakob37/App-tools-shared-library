import React = require('react');
interface DataProviderProps {
    storage_key: string;
    children: React.ReactNode;
}
declare const StorageProvider: React.FC<DataProviderProps>;
declare const loadDataFromStorage: (storage_key: string, onLoad: (loadedEntries: any[]) => void) => Promise<void>;
export { loadDataFromStorage, StorageProvider };
