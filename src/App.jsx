import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        // Set both width and height to 200px
        const newWidth = 500;
        const newHeight = 500;
  
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Set canvas dimensions to the new 200x200 size
        canvas.width = newWidth;
        canvas.height = newHeight;
  
        // Draw the resized image onto the canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
        // Convert canvas to an image URL
        const resizedImageUrl = canvas.toDataURL("image/jpeg");
  
        // Set the resized image data
        setImage({
          url: resizedImageUrl,
          width: newWidth,
          height: newHeight,
        });
      };
    };
  
    file && getImage();
  }, [file]);
  
  console.log("img", image);
  return (
    <>
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
        <div className="newPostCard">
          <div className="addPost">
            <img
              className="avatar"
              src="https://images.pexels.com/photos/1405845/pexels-photo-1405845.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              width="940"
              height="650"
            />
            <div className="postForm">
              <input
                type="text"
                placeholder="What's on your mind"
                className="postInput"
              />
              <label htmlFor="file">
                <img
                  className="addImage"
                  src="https://plus.unsplash.com/premium_photo-1723507306975-36dfe1666df3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                {/* <img
                  className="addImage"
                  src="https://plus.unsplash.com/premium_photo-1723507306975-36dfe1666df3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <img
                  className="addImage"
                  src="https://plus.unsplash.com/premium_photo-1723507306975-36dfe1666df3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                /> */}
                <button>Send</button>
              </label>
              <input
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
