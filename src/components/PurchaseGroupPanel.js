import React from 'react'
import { useEffect, useState } from 'react'


import PurchaseGroup from "./PurcahseGroup"

const PurchaseGroupPanel = (props) => {
    const [purchaseGroupsArray, setPurchaseGroupsArray] = useState([]);
    const [createNew, setCreatedNew] = useState(false);
    const [saveNew, setSavedNew] = useState(false);
    const [groupNames, setGroupNames] = useState([]);
    const [reachLimit, setReachLimit] = useState(0);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [updateDB, setUpdateDB] = useState(false);
    const [updateGroupName, setUpdateGroupName] = useState(null);
    const [upadteGroupID, setUpadteGroupID] = useState(null);
    const [deleteDb, setDeleteDB] = useState(false);
    const [deleteGroupID, setDeleteGroupID] = useState(false);


    useEffect(() => {
        const userid = localStorage.getItem("userId");
        const fetchPurchaseGroup = async () => {
            let result = await fetch(`http://localhost:5000/dashboard/purcahsegroups/${userid}`);
            result = await result.json();
            console.log(result[0]._id);
            setSelectedGroup(result[0]._id);
            setPurchaseGroupsArray(result);
        }

        const CreatePurchaseGroup = async () => {
            const requestOptions = {
                method: 'post',
                body: JSON.stringify({ user_id: userid, group_name: groupNames }),
                headers: { 'Content-Type': 'application/json' }
            }
            let result = await fetch("http://localhost:5000/dashboard/purcahsegroups", requestOptions);
            result = await result.json();
            console.log(result);
            setCreatedNew(false);
            setSavedNew(false);
            setGroupNames("");
            fetchPurchaseGroup();
        }


        const updatePurchaseGroup = async () => {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify({ group_id: upadteGroupID, group_name: updateGroupName }),
                headers: { 'Content-Type': 'application/json' }
            }
            let result = await fetch("http://localhost:5000/dashboard/purcahsegroups", requestOptions);
            result = await result.json();
            console.log(result);
            setUpdateGroupName("");
            setUpadteGroupID("");
            fetchPurchaseGroup();
        }

        const deletePurchaseGroup = async () => {
            const requestOptions = {
                method: 'DELETE'
            }
            await fetch(`http://localhost:5000/dashboard/purcahsegroups/${deleteGroupID}`, requestOptions);
            setDeleteGroupID("");
            fetchPurchaseGroup();
        }


        if (createNew && saveNew) {
            console.log("Push save new group");
            CreatePurchaseGroup();
        }


        if (updateDB) {
            updatePurchaseGroup();
            setUpdateDB(false);
        }

        if (deleteDb) {
            deletePurchaseGroup();
            setDeleteDB(false);
        }
        props.updateDashboardCall(true);

        fetchPurchaseGroup();


    }, [setPurchaseGroupsArray, setSavedNew, setCreatedNew, createNew, saveNew, updateDB, deleteDb]);

    useEffect(() => {


    }, [selectedGroup])


    const groupSelected = (e) => {
        console.log("Selected group id: " + e);
        // setSelectedGroup(e);
        props.groupid(e);
        props.updateDashboardCall(true);

    }

    const updateGroupCall = (id, name) => {
        console.log("Update group id: " + id + "name: " + name);
        setUpdateDB(true);
        setUpadteGroupID(id);
        setUpdateGroupName(name);
        props.updateDashboardCall(true);
    }

    const deleteGroupCall = (id) => {
        console.log("Delete group id: " + id);
        setDeleteDB(true);
        setDeleteGroupID(id);
        props.updateDashboardCall(true);
    }



    const purchaseGropupElements = purchaseGroupsArray.map((group, index) => {
        return <PurchaseGroup key={group._id} group_name={group.group_name} group_id={group._id} selectAction={groupSelected} updateAction={updateGroupCall} groupSelected={selectedGroup} deletAction={deleteGroupCall} />
    });




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
        setGroupNames("");
    };


    return (
        <div className="purcahseGroupPanel flexFS flexColum alignTop">
            {purchaseGropupElements}
            <div className={reachLimit > 4 ? "hide purchaseGroupNew flexSE flexColum" : "purchaseGroupNew flexSE flexColum"}>

                <img className={createNew ? "icons hide" : "icons"} src={require('../icons/add_create_new_plus_icon.png')} alt='' onClick={createHandler} />
                <div className={createNew ? "flexSE gap " : "flexSE gap  hide"}>
                    <input
                        className="inputBoxSmall"
                        type="text"
                        placeholder="Enter Group Name"
                        value={groupNames}
                        onChange={(e) => { setGroupNames(e.target.value) }}
                    />
                    <img className="iconsSmall" src={require('../icons/save_icon.png')} alt='' onClick={saveHandler} />
                    <img className="iconsSmall" src={require('../icons/Icon awesome-window-close.png')} alt='' onClick={cancelHandler} />


                </div>
            </div>

        </div>



    )
}

export default PurchaseGroupPanel