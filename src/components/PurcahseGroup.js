import React from 'react'
import { useState, useEffect } from 'react'

const PurcahseGroup = (props) => {
    const [menu, setMenu] = useState(false);
    const [groupNames, setGroupNames] = useState(props.group_name);
    const [selected, setSelected] = useState(props.groupSelected);



    const groupClickHandler = () => {
        props.selectAction(props.group_id);
    }

    const editClickHandler = () => {
        setMenu(!menu);
    }

    const saveHandler = (e) => {
        console.log("Save clicked");
        props.updateAction(props.group_id, groupNames);
        setMenu(false);
    }


    const deleteClickHandler = () => {
        props.deletAction(props.group_id);
        setMenu(false);
    }

    return (
        <div className='purchaseGroupNew flexSB paddingInlineSmall'>
            <div className={menu ? "purchaseGroupNewBase flexSB hide" : "purchaseGroupNewBase flexSB"} onClick={groupClickHandler}>
                <h3>{props.group_name}</h3>
            </div>
            <div className={!menu ? "flexSB gap hide" : "flexSB gap"}>
                <input
                    className="inputBoxSmall"
                    type="text"
                    placeholder={props.group_name}
                    value={groupNames}
                    onChange={(e) => { setGroupNames(e.target.value) }}
                />
                <img className="icons" src={require("../icons/delete.png")} alt="" onClick={deleteClickHandler} />
                <img className="iconsSmall" src={require('../icons/save_icon.png')} alt='' onClick={saveHandler} />
            </div>
            <img className={menu ? "icons hide" : "icons"} src={require('../icons/edit_menu.png')} alt='' onClick={editClickHandler} />
        </div>

    )
}

export default PurcahseGroup