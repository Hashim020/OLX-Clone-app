import React, { useState, useContext, useEffect } from "react";

import "./View.css";
import { postContext } from "../../store/postContext";
import { firebaseContext } from "../../store/Context";
import { getDocs, query, where ,collection} from "firebase/firestore";
function View() {
  const [userDetails, setUser] = useState();

  const { postDetails } = useContext(postContext);
  const { db } = useContext(firebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        const usersCollection = collection(db, "users"); // Specify the Firestore collection
        const q = query(usersCollection, where("id", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Check if there are matching documents
          querySnapshot.forEach((doc) => {
            setUser(doc.data()); // Set the user details
          });
        } else {
          alert('no user founded')
          console.log("No matching user found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails(); // Call the async function
  }, []); // Provide an empty dependency array to run this effect only once

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails ? (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default View;
