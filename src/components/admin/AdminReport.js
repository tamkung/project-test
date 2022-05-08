import React, { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { MdReport } from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
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

            <h1 className="mt-3" style={{ textAlign: 'center', color: 'red'}}><MdReport /> รายงานปัญหา <MdReport /> </h1>
            <hr />
            <div className="container-report" >
                <br />

                <table>
                    {Object.keys(values).map((id, index) => {
                        return(
                                <tr >
                                    <td scope="col">{values[id].DataTime}</td>
                                    <td scope="col">{values[id].RpHeader}</td>
                                    <td scope="col">{values[id].ReportType}</td>
                                    <td scope="col">{values[id].RpDetails}</td>
                                    <td scope="col">{values[id].FromEmail}</td>
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
                                
                            
                        );
                    })}
                </table>
            </div>
        </div>
    )
}
export default AdminReport;

