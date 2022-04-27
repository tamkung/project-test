import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";
import { Link } from 'react-router-dom';

function DownloadButton() {
    const CountOne = () =>{
        values.Download++

        
    }
    const [values, setValues] = useState({
        UserId: "",
        Email: "",
        ThesisImg: "[]",
        ThesisAllow: "",
        ThesisFile: "[]",
        ThesisDetails: "",
        ThesisName: "",
        ThesisType: "",
        DevName1: "",
        DevName2: "",
        Like: "",
        View: "",
        Download: "",
    });

    const { id } = useParams();

    useEffect(() => {
        firebaseDB.child("Thesis").child(id).on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setValues({ ...snapshot.val() });
            } else {
                setValues({});
            }
        });
        return () => {
            setValues({});
        };
    }, [id]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const CountDownload = (e) => {
        e.preventDefault();

        if (values.ThesisName == null) {
            console.log("null");
        } else {
            // --------add data----------------
            // ----------------- push----------เจคคีย์ใหม่ให้
            // ----------------- set----------ใส่ค่าที่มีอยู่ลงใน child
            firebaseDB.child("Thesis").child(id).update(values, (error) => {
                if (error) {
                    alert.error(error);
                }
                else {
                    
                    console.log("edit data success");
                }
            });
        }
    }

    return (
        <div>
            <div className="container">



                <div className="form-group mt-3">

                    <button id="Download" value={CountOne} className="btn btn-success col mx-3" onClick={CountDownload} to='#'>
                        Download : {values.Download}
                    </button>
                </div>
            </div>








        </div >
    );
}
export default DownloadButton;