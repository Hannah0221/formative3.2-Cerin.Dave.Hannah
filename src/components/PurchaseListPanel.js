import React from 'react'
import PurchaseList from "./PurchaseList"
import { useEffect, useState } from 'react'



const PurchaseListPanel = (props) => {
    const [createNew, setCreatedNew] = useState(false);
    const [saveNew, setSavedNew] = useState(false);
    const [itemNames, setItemNames] = useState([]);
    const [categorySelected, setCategorySelected] = useState("");
    const [purchaseListsArray, setPurchaseListsArray] = useState([]);
    const [groupid, setGroupid] = useState(props.group_id);

    useEffect(() => {
        // const userid = localStorage.getItem("userId");
        // const fetchPurchaseList = async () => {
        //     let result = await fetch(`http://localhost:5000/dashboard/purcahselist/${userid}`);
        //     result = await result.json();
        //     console.log(result);
        //     setPurchaseListsArray(result);
        // }

        // const CreatePurchaseGroup = async () => {
        //     const requestOptions = {
        //         method: 'post',
        //         body: JSON.stringify({ user_id: userid, group_id: groupNames }),
        //         headers: { 'Content-Type': 'application/json' }
        //     }
        //     let result = await fetch("http://localhost:5000/dashboard/purcahselist", requestOptions);
        //     result = await result.json();
        //     console.log(result);
        //     setCreatedNew(false);
        //     setSavedNew(false);
        //     setGroupNames("");
        //     // setPurchaseGroupsArray(result);
        // }

        // if (createNew && saveNew) {
        //     console.log("Push save new group");
        //     CreatePurchaseGroup();
        // }
        // fetchPurchaseList();
        console.log("group is updated in list panel" + groupid);

    }, [setPurchaseListsArray, setSavedNew, setCreatedNew, createNew, saveNew, groupid]);

    const createHandler = (e) => {
        console.log("Create clicked");
        setCreatedNew(true);
    }

    const saveHandler = (e) => {
        console.log("Save clicked");
        setSavedNew(true);
    }
    const cancelHandler = (e) => {
        console.log("Cancel clicked");
        setCreatedNew(false);
        setSavedNew(false);
        setItemNames("");
        setCategorySelected("");
    };




    return (
        <div className='purchaseListPanel'>
            <PurchaseList item_name={"Milk"} />
            <div className='purchaseGroupNew flexSE flexColum'>
                <img className={createNew ? "icons hide" : "icons"} src={require('../icons/add_create_new_plus_icon.png')} alt='' onClick={createHandler} />
                <div className={createNew ? "purcchaseGroupNewField flexSE gap " : "purcchaseGroupNewField flexSE gap  hide"}>
                    <input
                        className="inputBoxSmall"
                        type="text"
                        placeholder="Item name"
                        value={itemNames}
                        onChange={(e) => { setItemNames(e.target.value) }}
                    />
                    <div>
                        <select className='dropdown' onChange={(e) => { setCategorySelected(e.target.value) }}>
                            <option value="Bakery">Bakery</option>
                            <option value="Produce">Produce</option>
                            <option value="Frozen Foods">Frozen Foods</option>
                            <option value="Meat & Seafood">Meat & Seafood</option>
                            <option value="Pasta & Rice">Pasta & Rice</option>
                            <option value="Cereals & Breakfast">Cereals & Breakfast</option>
                            <option value="Oils & Salad Dressings">Oils & Salad Dressings</option>
                            <option value="Soups & Canned Goods">Soups & Canned Goods</option>
                            <option value="Dairy, Cheese & Egg">Dairy, Cheese & Egg</option>
                            <option value="Health & Personal Care">Health & Personal Care</option>
                        </select>
                    </div>


                    <img className="iconsSmall" src={require('../icons/save_icon.png')} alt='' onClick={saveHandler} />
                    <img className="iconsSmall" src={require('../icons/Icon awesome-window-close.png')} alt='' onClick={cancelHandler} />
                </div>

            </div>
        </div >
    )
}



export default PurchaseListPanel