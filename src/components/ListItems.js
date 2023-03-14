import React from 'react'
import { useState } from 'react'

const ListItems = (props) => {
    const [selected, setSelected] = useState([false]);
    return (
        <div className="listItems flexSE gap paddingTopSmall">
            <img className="icons" src={require('../icons/selected.png')} alt="unselected Icon" onClick={(e) => { }} />
            <h4>{props.name}</h4>
        </div>
    )
}

export default ListItems