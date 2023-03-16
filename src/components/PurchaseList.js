import React from "react";
import { useEffect, useState } from 'react'



const PurchaseList = (props) => {
    const [checked, setChecked] = useState(props.completed);
    const [editMode, setEditMode] = useState(false);
    const [itemNames, setItemNames] = useState(props.item_name);


    const handleChange = (e) => {
        setChecked(e.target.checked);
        console.log(e.target.checked);
        setChecked(e.target.checked);
        props.updateListCall(props.item_id, itemNames, e.target.checked);
    };

    const editClicHandler = () => {
        // props.updateListCall(props.id, props.item_name, checked);
        setEditMode(!editMode);
    };

    const saveHandler = () => {
        setEditMode(false);
        props.updateListCall(props.item_id, itemNames, checked);
    }

    return (
        <div className="purchaseList flexSB paddingInline">
            <div >
                <label className={editMode ? "flexFS gap hide" : "flexFS gap"}>
                    <input type="checkbox"
                        checked={checked}
                        onChange={handleChange} />
                    <h3 >{props.item_name}</h3>
                </label>
                <div className={editMode ? "purcchaseGroupNewField flexSE gap " : "purcchaseGroupNewField flexSE gap  hide"}>
                    <input
                        className="inputBoxSmall"
                        type="text"
                        placeholder="Item name"
                        value={itemNames}
                        onChange={(e) => { setItemNames(e.target.value) }}
                    />
                </div>
            </div>

            <div className="flexSB gap">
                <img
                    className={editMode ? "iconEdit hide" : "iconEdit"}
                    src={require("../icons/Icon awesome-edit.png")}
                    alt=""
                    onClick={editClicHandler}
                />
                <img className={!editMode ? "icons" : "icons hide"} src={require("../icons/delete.png")} alt="" />
                <img className={editMode ? "iconsSmall" : "iconsSmall hide"} src={require('../icons/save_icon.png')} alt='' onClick={saveHandler} />

            </div>
        </div>
    );
};

export default PurchaseList;
