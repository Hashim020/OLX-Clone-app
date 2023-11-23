import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { firebaseContext, authContext } from "../../store/Context";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const { db } = useContext(firebaseContext);
  const { user } = useContext(authContext);

  const navigate = useNavigate()

  const date = new Date();

  const handleSubmit = () => {
    // Validation checks
    if (name.trim() === "") {
      alert("Please enter a name.");
      return;
    }

    if (category.trim() === "") {
      alert("Please enter a category.");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(price) || parseFloat(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `/image/${image.name}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "products"), {
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          })
          navigate('/');
        });
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>

          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
