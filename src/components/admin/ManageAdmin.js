import React from "react";
import { firebaseDB, firebase } from "../../services/firebase";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { firebaseStorage } from "../../services/firebase";
import Swal from 'sweetalert2'

function ManageAdmin() {
    const [values, setValues] = useState({});
    useEffect(() => {
        firebaseDB.child("Admin").orderByChild("type").equalTo("Admin").on("value", (snapshot) => {
            console.log(snapshot.val())
            if (snapshot.val() !== null) {
                setValues({ ...snapshot.val() });
                console.log(snapshot.val())
            } else {
                setValues({});
            }
        });
        return () => {
            setValues({});
        };
    }, []);
    const onDelete = (id) => {
        const storageRef = firebaseStorage.ref().child(`Thesis/${id}`);
        storageRef.listAll().then((listResults) => {
            const promises = listResults.items.map((item) => {
                return item.delete();
            });
            Promise.all(promises);
            console.log(promises);
        });
        Swal.fire({
            title: 'ไม่อนุมัติปริญญานิพนธ์นี้?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#189B12',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                firebaseDB.child(`Thesis/${id}`)
                    .remove()
                    .then(() => {
                        console.log("Contact Deleted Successfully");
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    };
    const onUpdateAllow = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            text: "ต้องการอนุมัติปริญญานิพนธ์นี้ใช้หรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'อนุมัติ',
        }).then((result) => {
            if (result.isConfirmed) {

                swalWithBootstrapButtons.fire(
                    'อนุมัติแล้ว!',
                    '',
                    'success'
                )
                firebaseDB.child("Thesis").child(id)
                    .update({ ThesisAllow: true, }).catch((error) => {
                        console.error(error);
                    });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'ยกเลิก',
                    '',
                    'error'
                )
            }
        })
    }


    return (
        <div style={{ minHeight: "800px" }}>
            <div className="container mt-5" >
                <h1>จัดการ Admin</h1>
                <hr />
                {Object.keys(values).map((id, i) => {
                    return (
                        <div key={i}>
                            <Card>
                                <Card.Header style={{ fontSize: "14px" }}  > {values[id].uid} </Card.Header>
                                <Card.Body>
                                    <Card.Title>ชื่อ : {values[id].uid}</Card.Title>
                                    <Card.Text>ประเภท : {values[id].email}</Card.Text>
                                    {/* <div className="flex">
                                        {values[id].ThesisImg.map((url, i) => (
                                            <div interval={3000} key={i}>
                                                <img
                                                    src={url}
                                                    alt="First slide"
                                                    style={{
                                                        height: "200px",
                                                        textAlign: "center",
                                                        margin: "1%"
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div> */}

                                    <div className="row">
                                        <div className="col">
                                            {/* <Button href={values[id].ThesisFile[0]} target="_blank">File</Button> */}
                                        </div>
                                        <div className="col" style={{ textAlign: "right" }}>
                                            <Button style={{ margin: "5px" }} variant="primary" onClick={() => onUpdateAllow(id)}>อนุมัติ</Button>
                                            <Button className="btn-danger" style={{ margin: "5px" }} variant="primary" onClick={

                                                () => onDelete(id)}>ไม่อนุมัติ</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <br />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default ManageAdmin;
