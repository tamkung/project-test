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

                <table>
                    {Object.keys(values).map((id, index) => {
                        return (
                            <div>
                                <div style={{ display: "flex", flexWarp: "warp", flexDirection:"row" , alignContent:"flex-start",justifyContent:"start" }}>
                                    <div style={{display:"block"}}>

                                    </div>

                                </div>
                                <tr style={{ background: "blue" }}>
                                    <td scope="col" style={{ whiteSpace: "nowrap", fontSize: "1vw", paddingRight: "50px" }}>{values[id].DataTime}</td>
                                    <td scope="col" style={{ whiteSpace: "nowrap", fontSize: "1vw" }}>{values[id].RpHeader}</td>
                                    <td className="d-none d-sm-block" scope="col" style={{ whiteSpace: "nowrap", fontSize: "1vw", background: "red" }}>{values[id].ReportType}</td>
                                    <td scope="col" style={{ whiteSpace: "nowrap", width: "800px", fontSize: "1vw" }} >{values[id].RpDetails}</td>
                                    <td scope="col" style={{ whiteSpace: "nowrap", width: "50px", fontSize: "1vw" }}>{values[id].FromEmail}</td>
                                    <td>
                                        <AiIcons.AiOutlineCheckCircle type="button" style={{ color: 'green', fontSize: '125%' }}

                                            onClick={() => onDelete(id)}
                                        />
                                        &nbsp;&nbsp;
                                        <AiIcons.AiFillMinusCircle type="button" style={{ color: 'red', fontSize: '125%' }}

                                            onClick={() => onDelete(id)}
                                        />
                                    </td>
                                </tr>
                            </div>
                        );
                    })}
                </table>
            </div>
        </div>
    )
}
export default AdminReport;

