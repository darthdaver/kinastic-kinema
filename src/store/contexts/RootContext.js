import React, { createContext, useContext } from 'react';
import RootStore from '../models/RootStore';

const RootStoreContext = createContext();

const RootStoreProvider = ({ children }) => {
    const rootStore = new RootStore();
    
    return (
        <RootStoreContext.Provider value={rootStore}>
            {children}
        </RootStoreContext.Provider>
    )
}

export const useRootStore = () => useContext(RootStoreContext)

export default RootStoreProvider;