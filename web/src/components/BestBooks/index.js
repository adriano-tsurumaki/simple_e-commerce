import React from 'react';

import SelectBestProvider, { useSelectBest } from '../../context/SelectBest';

import ListingBooks from'../ListingBooks';

import './styles.css';

const OptionNavigator = () => {
    const { option, selected, setSelected } = useSelectBest();

    // const [selected, setSelected] = useState('');
    const handleOption = (initial) => {
        if(option.filter(op => op.initial === initial).length !== 0) {
            setSelected(initial);
        }
    }

    return (
        <div className="navigator">
            {
                option.map(op => {
                    return (
                        <span 
                            className={selected === op.initial ? 'selected' : ''}
                            onClick={() => handleOption(op.initial)}
                            key={op.initial}
                        >
                            {op.title}
                        </span>
                    )
                })
            }
        </div>
    )
}

const BestBooks = () => {

    // const Books = [
    //     {
    //         title: '',
    //         author: '',
    //         img: ''
    //     },
    // ]

    return (
        <SelectBestProvider>
            <div className="container-grid-book-geral">
                <div className="container-grid-navigator">
                    <OptionNavigator />
                </div>
            </div>
            <div className="container-grid-book-geral">
                <ListingBooks />
            </div>
        </SelectBestProvider>
    )
}

export default BestBooks;