import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseDB } from "../../services/firebase";
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2'
function AdminEditThesis() {
    const [values, setValues] = useState({
        ThesisImg: "[]",
        ThesisAllow: "",
        ThesisFile: "[]",
        ThesisDetails: "",
        ThesisName: "",
        ThesisType: "",
        DevName1: "",
        DevName2: "",
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

    const updateThesis = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'คุณต้องการแก้ไขหรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#189B12',
            cancelButtonColor: '#d33',
            confirmButtonText: 'แก้ไข',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                if (values.ThesisName == null) {
                    console.log("null");
                } else {
                    firebaseDB.child("Thesis").child(id).update(values);
                    window.location.href = '/'
                }
                Swal.fire(
                    'แก้ไขเสร็จสิ้น',
                    '',
                    'success'
                )
            }
        })








    }

    return (
        <div>
            <div className="container">
                <hr />
                <br />
                <h3>Edit Thesis</h3>
                <br />
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="ThesisName">ชื่อปริญญานิพนธ์</label>
                            <input
                                type="text"
                                id="ThesisName"
                                name="ThesisName"
                                className="form-control"
                                placeholder="Thesis Name"
                                value={values.ThesisName}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="ThesisType">ประเภทปริญญานิพนธ์</label>

                            <br />
                            <select name="ThesisType" className="form-control" value={values.ThesisType} onChange={handleOnChange}>
                                <option defaultValue>Choose...</option>
                                <option value="เว็บไซต์">เว็บไซต์</option>
                                <option value="แอปพลิเคชัน">แอปพลิเคชัน</option>
                                <option value="อุปกรณ์ Iot">อุปกรณ์ Iot</option>
                                <option value="สื่อการเรียนรู้">สื่อการเรียนรู้</option>
                                <option value="เกม">เกม</option>
                                <option value="VR AR MR">VR AR MR</option>
                                <option value="อื่นๆ">อื่นๆ</option>
                            </select>

                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="ThesisDev">ผู้พัฒนา</label>

                            <input
                                type="text"
                                id="DevName1"
                                name="DevName1"
                                className="form-control"
                                placeholder="Dev Name 1"
                                value={values.DevName1}
                                onChange={handleOnChange}

                            />
                            <div className="form-group mt-3">
                                <input
                                    type="text"
                                    id="DevName2"
                                    name="DevName2"
                                    className="form-control"
                                    placeholder="Dev Name 2"
                                    value={values.DevName2}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <Link className="btn col mx-3" to='/' style={{ color: "gray", fontSize: "24px" }}>
                                <IoIosArrowBack />
                            </Link>
                            <button className="btn btn-success col mx-3" onClick={updateThesis}>
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <br /><br /><br /><br /><br />

        </div>
    );
}
export default AdminEditThesis;