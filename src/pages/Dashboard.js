import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PurchaseGroupPanel from "../components/PurchaseGroupPanel";
// import PurchaseListPanel from "../components/PurchaseListPanel";
import PurchaseList from "../components/PurchaseList"
import ListItemPanel from "../components/ListItemPanel";

const Dashboard = () => {
    const [userName, SetUserName] = useState("");
    const [userId, SetUserId] = useState("");
    const [imgUrl, SetImgUrl] = useState("");
    const [selectedGroupid, setSelectedGroupid] = useState("");

    const [createNew, setCreatedNew] = useState(false);
    const [saveNew, setSavedNew] = useState(false);
    const [itemNames, setItemNames] = useState([]);
    const [categorySelected, setCategorySelected] = useState("Bakery");
    const [purchaseListsArray, setPurchaseListsArray] = useState([]);

    const [updateDashboard, setUpdateDashboard] = useState(false);
    const [updateListName, setUpdateListName] = useState("");
    const [updateListCategory, setUpdateListCategory] = useState("");
    const [upadteListID, setUpadteListID] = useState("");
    const [upadteListCompleted, setUpadteListCompleted] = useState(false);
    const [updateListDB, setUpdateListDB] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        SetUserId(localStorage.getItem('userId'));
        SetUserName(localStorage.getItem('userName'));
        SetImgUrl(localStorage.getItem('img_url'));
    }, []);

    useEffect(() => {

        const userid = localStorage.getItem("userId");
        const fetchPurchaselist = async () => {
            if (selectedGroupid) {
                let result = await fetch(`http://localhost:5000/dashboard/purcahselist/${selectedGroupid}`);
                result = await result.json();
                console.log(result);
                setPurchaseListsArray(result);
            }
        }

        const CreatePurchaseGroup = async () => {
            const requestOptions = {
                method: 'post',
                body: JSON.stringify({ group_id: selectedGroupid, item_name: itemNames, item_category: categorySelected, completed: false }),
                headers: { 'Content-Type': 'application/json' }
            }
            let result = await fetch("http://localhost:5000/dashboard/purcahselist", requestOptions);
            result = await result.json();
            console.log(result);
            setCreatedNew(false);
            setSavedNew(false);
        }

        const updatePurchaseList = async () => {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({ id: upadteListID, name: updateListName, checked: upadteListCompleted }),
                headers: { 'Content-Type': 'application/json' }
            }
            let result = await fetch("http://localhost:5000/dashboard/purcahselist", requestOptions);
            result = await result.json();
            console.log(result);
            setUpadteListID("");
            setUpdateListName("");
            fetchPurchaselist();
        }




        if (createNew && saveNew) {
            console.log("Push save new group");
            CreatePurchaseGroup();
            setItemNames("");
            setUpdateDashboard(true);
        }

        if (updateListDB) {
            updatePurchaseList();
            setUpdateListDB(false);
            setUpdateDashboard(false);
        }


        if (updateDashboard) {
            fetchPurchaselist();
            setUpdateDashboard(false);
        }



    }, [setPurchaseListsArray, setSavedNew, setCreatedNew, setUpdateDashboard, setUpdateListDB, createNew, saveNew, selectedGroupid, updateDashboard, updateListDB, upadteListCompleted]);



    const clickHandlerlogout = () => {
        localStorage.setItem("userId", "");
        localStorage.setItem("userName", "");
        localStorage.setItem("img_url", "");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("img_url");
        navigate("/");
    };

    const groupidChange = (e) => {
        console.log("Id geted on dashboard", e);
        setSelectedGroupid(e);
        setUpdateDashboard(true);
    }



    const createHandler = (e) => {
        console.log("Create clicked");
        setCreatedNew(true);
    }

    const saveHandler = (e) => {
        if (itemNames !== "" && categorySelected !== "" && selectedGroupid !== "") {
            setSavedNew(true)
        } else {
            setSavedNew(false);
        }
        console.log("Save clicked Item:" + itemNames + "category :" + categorySelected + selectedGroupid);

    }
    const cancelHandler = (e) => {
        console.log("Cancel clicked");
        setCreatedNew(false);
        setSavedNew(false);
        setItemNames("");
        setCategorySelected("");
    };

    const updateListCall = (id, name, checked) => {
        console.log("Update group id: " + id + " name: " + name + " checked: " + checked);
        setUpdateListDB(true);
        setUpadteListID(id);
        setUpdateListName(name);
        setUpadteListCompleted(checked);
    }

    const updateDashboardCall = (e) => {
        setUpdateDashboard(e);
        console.log("Update dashboard clicked");
    }

    const purchaseLIstElements = purchaseListsArray.map((group, index) => {
        return <PurchaseList key={group._id} item_name={group.item_name} item_id={group._id} completed={group.completed} updateListCall={updateListCall} />
    });


    return (<div className="flexSE">
        <div className="dashboardLeftPanel flexFS flexColum">
            <div className="logoBlock">
                <img className="logo " src={require('../icons/logo-d.png')} alt='' />
            </div>
            <PurchaseGroupPanel groupid={groupidChange} updateDashboardCall={updateDashboardCall} />
        </div>
        <div className="bashboardRightPanel">
            <div className="bashboardHeaderPanel flexFE">
                <img className="profileImage" src={imgUrl} alt="user Image" />
                <h4>{userName}</h4>
                <button
                    type="button"
                    className="logoutButton normal"
                    onClick={clickHandlerlogout}
                > Logout </button>
            </div>
            <div className="dashboardBody">
                {purchaseLIstElements}
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
                                <option defaultValue value="Bakery">Bakery</option>
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
                <div className="hide">
                    {/* <ListItemPanel /> */}
                </div>

            </div>

        </div>
    </div>);

};

export default Dashboard;