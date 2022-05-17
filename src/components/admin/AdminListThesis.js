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
    <div className="container">
      <div className="flex">



        {Object.keys(values).map((id, i) => {
          return (
            <div className="flex-item" >
            <div key={i}>
              <Card >
                <Card.Header >{values[id].ThesisName}</Card.Header>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    sizes="30px ,30px"
                    src={values[id].ThesisImg[0]}
                    style={{height:"150px" , marginBottom:"25px" }}
                  />
                  
                  {/* <Card.Text>{check.toString()}</Card.Text>  */}
                  {/* <Button variant="primary" onClick={()=>setCheck((prevCheck) => !prevCheck.value)}>อนุมัติ</Button> */}
                  <Button
                    className="mx-2"
                    variant="primary"

                    onClick={() =>
                      (window.location.href = `/admin/edit-thesis/${id}`)
                    }
                  >
                    แก้ไข
                  </Button>
                  <Button
                    className="mx-2"
                    variant="danger"
                    onClick={() => onDelete(id)}
                  >
                    ลบ
                  </Button>
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