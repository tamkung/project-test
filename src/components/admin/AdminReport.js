import React, { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { MdReport } from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
// import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";


function AdminReport() {
    const [values, setValues] = useState({});
    useEffect(() => {
        firebaseDB.child("Report").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setValues({ ...snapshot.val() });
            } else {
                setValues({});
            }
        },
        )
        return () => {
            setValues({});
        };
    }, []);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const onDelete = (id) => {
        if (
            window.confirm("คุณแน่ใจว่าจะลบหรือไม่?")
        ) {
            firebaseDB.child(`Report/${id}`).remove((err) => {
                if (err) {
                    console.error(err);
                } else {
                    // colors.log("Contact Deleted Successfully");
                    console.log("Deleted Successfully");
                }
            });
        }
    };
    return (
        <div className="container" >
            <h1 className="mt-3" style={{ textAlign: 'center', color: 'red' }}><MdReport /> รายงานปัญหา <MdReport /> </h1>
            <hr />
            <div className="container-report" >
                <br />
                {Object.keys(values).map((id, index) => {
                    return (
                        <div key={index} style={{marginBottom:"10px"}}>
                            <div style={{ display: "flex", width: "100%", boxSizing: "border-box", flexWarp: "warp", flexDirection: "row", alignContent: "flex-start", justifyContent: "start" }}>
                                <div style={{ display: "block", boxSizing: "border-box", width: "10%",  fontSize: "0.8vw", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].DataTime}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "15%", fontSize: "0.8vw", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].RpHeader}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "15%", fontSize: "0.8vw", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].ReportType}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "40%",  fontSize: "0.8vw", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].RpDetails}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "15%", fontSize: "0.8vw", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].Email}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "10%", textAlign: "center", paddingRight: "5px", paddingLeft: "5px" }}>
                                    <AiIcons.AiFillMinusCircle type="button" style={{ color: 'red', fontSize: '18px' }}
                                        onClick={() => onDelete(id)}
                                    />
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}
export default AdminReport;

