import React from 'react'
import ListItems from './ListItems'
import { useEffect, useState } from 'react'




const ListItemPanel = (props) => {
    const [search, setSearch] = useState('');
    const [listItemArray, SetListItemArray] = useState([]);

    useEffect(() => {
        const fetchListItems = async () => {
            let result = await fetch("http://localhost:5000/dashboard/listitems");
            result = await result.json();
            console.log(result);
            SetListItemArray(result);
        }
        fetchListItems();
    }, [SetListItemArray]);


    const items = listItemArray.map((item) => {
        return < ListItems name={item.name} />
    });


    return (
        <div className="listItemPanel flexFS flexColum alignTop paddingSmall">
            <img className="close" src={require('../icons/Icon awesome-window-close.png')} alt="Close Icon" />
            <div className="searchItems flexFS paddingTopSmall gap">
                <input
                    className="planeInputBox"
                    type="text"
                    placeholder="Butte_"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <img className='icons' src={require('../icons/Icon awesome-search.png')} alt="Search Icon" />
            </div>
            <h5>Search your shopping list</h5>
            {items}
        </div>
    )
}

export default ListItemPanel;