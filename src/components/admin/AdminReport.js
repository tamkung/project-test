import React, { useEffect, useState } from "react";
import { MdReport } from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import { firebaseDB } from "../../services/firebase";
import Swal from 'sweetalert2'
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
        Swal.fire({
            title: 'คุณต้องการลบหรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#189B12',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ลบรายงานนี้!',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                    firebaseDB.child(`Report/${id}`).remove();
                    

                Swal.fire(
                    'ลบสร็จสิ้น',
                    '',
                    'success'
                )
            }
        })
    };
    return (
        <div className="container" style={{ minHeight: "835px" }}>
            <h1 className="mt-3" style={{ textAlign: 'center', color: 'red' }}><MdReport /> รายงานปัญหา <MdReport /> </h1>
            <hr />
            <div className="container-report" >
                <br />
                {Object.keys(values).map((id, index) => {
                    return (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <div style={{ display: "flex", width: "100%", boxSizing: "border-box", flexWarp: "warp", flexDirection: "row", alignContent: "flex-start", justifyContent: "start" }}>
                                <div style={{ display: "block", boxSizing: "border-box", width: "10%", fontSize: "12px", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].DataTime}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "15%", fontSize: "12px", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].RpHeader}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "15%", fontSize: "12px", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].ReportType}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "40%", fontSize: "12px", paddingRight: "5px", paddingLeft: "5px" }}>
                                    {values[id].RpDetails}
                                </div>
                                <div style={{ display: "block", boxSizing: "border-box", width: "15%", fontSize: "12px", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", paddingRight: "5px", paddingLeft: "5px" }}>
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