import React, { createContext, useState } from 'react';
import { useContext } from 'react';

const SelectBestContext = createContext();

export default function SelectBestProvider({ children }) {
    const [option, setOption] = useState([
        { initial: 'BS', title: 'Best Seller' },
        { initial: 'BO', title: 'Best Offers' },
        { initial: 'PO', title: 'Pre-Order' },
        { initial: 'RL', title: 'Releases' }
    ]);

    const [selected, setSelected] = useState('');

    return (
        <SelectBestContext.Provider value={{
            option,
            setOption,
            selected,
            setSelected
        }}>
            {children}
        </SelectBestContext.Provider>
    )
}

export function useSelectBest() {
    const context = useContext(SelectBestContext);
    const { option, setOption, selected, setSelected } = context;
    return { option, setOption, selected, setSelected };
}