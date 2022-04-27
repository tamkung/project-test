import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";
import { Link } from 'react-router-dom';

function DownloadButton() {

    const [values, setValues] = useState({
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
                    <button id="Download" className="btn col mx-3" to='#' >
                        <a className="btn btn-success" href={values.ThesisFile} target="_blank"> Download : {values.Download}</a>
                    </button>
                </div>
            </div>








        </div >
    );
}
export default DownloadButton;