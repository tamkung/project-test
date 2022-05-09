import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../services/firebase";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import * as BiIcons from 'react-icons/bi'



function Search() {
    const [values, setValues] = useState({});
    // const [images, setImages] = useState([]);
    // const [sort, setSort] = useState(false);

    useEffect(() => {
        firebaseDB.child("Thesis").orderByChild("ThesisAllow").startAt(true).on("value", (snapshot) => {
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

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            &#x25bc;
        </a>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [values, setValues] = useState;
            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setValues(e.target.values)}
                        value={values}
                    />
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !values || child.props.children.toLowerCase().startsWith(values),
                        )}
                    </ul>
                </div>
            );
        },
    );

    return (
            <div style={{ marginBottom: "20px", marginTop: "20px", textAlign: "right" }}>
                <Dropdown >
                    <Dropdown.Toggle as={CustomToggle} className="btn" id="dropdown-custom-components" style={{ color: "white" }} >
                        <BiIcons.BiSearchAlt style={{ color: "black", fontSize: "20px", marginRight: "5px" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                        {Object.keys(values).map((id, index) => {
                            return (
                                <Dropdown.Item onClick={() =>
                                    (window.location.href = `/view-thesis/${id}`)
                                }>
                                    {values[id].ThesisName}

                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
    )
}

export default Search