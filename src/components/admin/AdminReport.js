import React, { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { MdReport } from 'react-icons/md';
import { AiFillMinusCircle } from 'react-icons/ai';

// import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";


function AdminReport() {

    const [values, setValues] = useState({});
    // const [sortedData, setSortedData] = useState([]);
    // const [sort, setSort] = useState(false);


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

    // const updateReport = (e) => {
    //     e.preventDefault();
    //     if (
    //         window.confirm("คุณแก้ปัญหาเรียบร้อยแล้วหรือไม่?")
    //     )
    //         if (values.FromEmail == null) {
    //             console.log("null");
    //         } else {
    //             // --------add data----------------
    //             // ----------------- push----------เจคคีย์ใหม่ให้
    //             // ----------------- set----------ใส่ค่าที่มีอยู่ลงใน child
    //             firebaseDB.child("Report").child(id).update(values, (error) => {
    //                 if (error) {
    //                     alert.error(error);
    //                 }
    //                 else {
    //                     console.log("data success");
    //                 }
    //             });
    //         }
    // }



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
        <div className="container">
             <h1 className="mt-3" style={{ textAlign: 'center', color: 'red', border: '5px' }}><MdReport /> รายงานปัญหา <MdReport /> </h1>
            <hr />
            <br />
            <table className="table table-hover">
                {Object.keys(values).map((id, index) => {
                    return (
                        <tbody>
                            <tr>
                                <td>
                                    <input className="chk1"
                                        type="checkbox"
                                        id="chkcomp"
                                        Name="chkcomp"
                                        value="complete"
                                        onChange={handleOnChange}
                                    />
                                </td>

                                <td scope="col">{values[id].DataTime}</td>
                                <td scope="col">{values[id].RpHeader}</td>
                                <td scope="col">{values[id].FromEmail}</td>
                                <td>
                                    <Dropdown>
                                        More Details&nbsp;&nbsp;
                                        <Dropdown.Toggle variant="transprent" >

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>{values[id].RpDetail}</Dropdown.Item>

                                        </Dropdown.Menu>
                                    </Dropdown></td>
                                <td>
                                    <AiFillMinusCircle type="button" style={{ color: 'red', fontSize: '125%' }}

                                        onClick={() => onDelete(id)}
                                    />

                                </td>
                            </tr>

                        </tbody>
                    );
                })}
            </table>
        </div>
    )
}
export default AdminReport;

