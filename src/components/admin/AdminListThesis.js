import React, { useEffect, useState } from "react";
import { firebaseDB, firebaseStorage } from "../../services/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Card, Button } from "react-bootstrap";
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import Swal from 'sweetalert2'
function AdminListThesis() {
  const [values, setValues] = useState({});

  useEffect(() => {
    firebaseDB
      .child("Thesis")
      .orderByChild("ThesisAllow")
      .equalTo(true)
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val() });
        } else {
          setValues({});
        }
      });

    return () => {
      setValues({});
    };
  }, []);

  const onDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    Swal.fire({
      title: 'ลบปริญญานิพนธ์นี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#189B12',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        {
          const storageRef = firebaseStorage.ref().child(`Thesis/${id}`);
          storageRef.listAll().then((listResults) => {
            const promises = listResults.items.map((item) => {
              return item.delete();
            });
            Promise.all(promises);
            console.log(promises);
          });
          firebaseDB.child(`Thesis/${id}`)
            .remove()
            .then(() => {
              console.log("Contact Deleted Successfully");
            })
            .catch((err) => {
              console.error(err);
            });
        }
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })


  };
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="flex">
        {Object.keys(values).map((id, i) => {
          return (
            <div className="itemflex" key={i}>
              <div  >
                <Card style={{ height: "auto" }}>
                  <Card.Header style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{values[id].ThesisName}</Card.Header>
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={values[id].ThesisImg[0]}
                      style={{ marginBottom: "25px" }}
                    />
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                      <AiIcons.AiOutlineEye /> {values[id].View} &nbsp;&nbsp;&nbsp;&nbsp;
                      {values[id].Like ? (<>
                        <AiIcons.AiOutlineLike /> {values[id].Like.length}</>) : (<>
                          <AiIcons.AiOutlineLike /> 0 </>)}

                    </div>
                    <div type='button'
                      className="mx-2 edit-admin-btn"
                      variant="primary"
                      style={{ textAlign: "center" }}
                      onClick={() =>
                        (window.location.href = `/admin/edit-thesis/${id}`)
                      }
                    >
                      แก้ไข
                    </div>
                    <div type='button'
                      style={{ textAlign: "center" }}
                      className="mx-2 delete-admin-btn"
                      variant="danger"
                      onClick={() => onDelete(id)}
                    >
                      ลบ
                    </div>
                  </Card.Body>
                </Card>
                <br />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
export default AdminListThesis;