import React, { useEffect, useState } from "react";
import { firebaseDB, firebaseStorage } from "../../services/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Card, Button } from "react-bootstrap";

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
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
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
  };
  return (
    <div className="container" style={{ marginTop: "50px"}}>
      <div className="flex">

        {Object.keys(values).map((id, i) => {
          return (
            <div className="itemflex">
              <div key={i} >
                <Card  style={{ height: "auto"}}>
                  <Card.Header style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{values[id].ThesisName}</Card.Header>
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={values[id].ThesisImg[0]}
                      style={{ marginBottom: "25px" }}
                    />

                    {/* <Card.Text>{check.toString()}</Card.Text>  */}
                    {/* <Button variant="primary" onClick={()=>setCheck((prevCheck) => !prevCheck.value)}>อนุมัติ</Button> */}
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