import React from "react";
import { firebaseDB, firebase } from "../../services/firebase";
import { useEffect, useState } from "react";
import { Card, CardImg, Button } from "react-bootstrap";
import { firebaseStorage } from "../../services/firebase";
function AdminAllow() {
  const [values, setValues] = useState({});
  useEffect(() => {
    firebaseDB.child("Thesis").orderByChild("ThesisAllow").equalTo(false).on("value", (snapshot) => {
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

  const onUpdateAllow = (id) => {
    firebaseDB.child("Thesis").child(id)
      .update({ ThesisAllow: true, }).then(() => {
        alert("Add Admin success");
      }).catch((error) => {
        console.error(error);
      });
  }


  return (
    <div>
      <div className="container mt-5">
        <h1>อนุมัติ Thesis</h1>
        <hr />
        {Object.keys(values).map((id, i) => {
          return (
            <div key={i}>
              <Card>
                <Card.Header style={{ fontSize: "1vw" }}  > <img src={values[id].DevPhoto} style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight: "10px" }} /> {values[id].Email} </Card.Header>
                <Card.Body>
                  <Card.Title>ชื่อ : {values[id].ThesisName}</Card.Title>
                  <Card.Text>ประเภท : {values[id].ThesisType}</Card.Text>
                  <Card.Text>เจ้าของ : {values[id].DevName1}  {values[id].DevName2}</Card.Text>
                  <div className="row">
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
                  </div>
                  <Card.Text>{values[id].ThesisDetails}</Card.Text>
                  <div className="row">
                    <div className="col">
                      <Button href={values[id].ThesisFile[0]} target="_blank">File</Button>
                    </div>
                    <div className="col" style={{ textAlign: "right" }}>
                      <Button style={{ margin: "5px" }} variant="primary" onClick={() => onUpdateAllow(id)}>อนุมัติ</Button>
                      <Button className="btn-danger" style={{ margin: "5px" }} variant="primary" onClick={() => onDelete(id)}>ไม่อนุมัติ</Button>
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
export default AdminAllow;
