import React from "react";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const NewPost = ({ image }) => {
  console.log("clg================================>", image);
  const { url, width, height } = image;
  const [faces, setFaces] = useState([]);
  const [friends, setFriends] = useState([]);
  const imageRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(
      imageRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    setFaces(detections.map((face) => Object.values(face.box)));
    console.log("faces", faces);
    // .withFaceLandmarks()
    // .withFaceExpressions();
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
      imageRef.current
    );

    // faceapi.matchDimensions(canvasRef.current, {
    //   width,
    //   height
    // });
    // const resizedDetections = faceapi.resizeResults(detections, {
    //   width,
    //   height,
    // });
    // faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
    // faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
    console.log("detections", detections);
  };
  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };
    imageRef.current && loadModels();
  }, []);

  const enter = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";
    faces.map((face) => ctx.strokeRect(...face));
  };
  const addFriend = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("friends", friends);
  };
  return (
    <div className="container">
      {/* <img
        crossOrigin="anonymous"
        ref={imageRef}
        src="https://images.pexels.com/photos/1405845/pexels-photo-1405845.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
        width="940"
        height="650"
      />
      <canvas ref={canvasRef} height="940" width="650"></canvas> */}
      <div className="left" style={{ width, height }}>
        <img src={url} alt="" crossOrigin="anonymous" ref={imageRef} />
        <canvas
          onMouseEnter={enter}
          ref={canvasRef}
          height={height}
          width={width}
        />
        {faces.map((face, i) => (
          <input
            name={`input${i}`}
            style={{ left: face[0], top: face[1] + face[3] + 5 }}
            type="text"
            placeholder="Tag your friend"
            key="i"
            className="friendInput"
            onChange={addFriend}
          />
        ))}
      </div>
      <div className="right">
        <h1>Share post</h1>
        <input
          type="text"
          placeholder="What's on your mind"
          className="rightInput"
        />
        {
          friends && (
            <span className="friends">with <span className="name">{Object.values(friends) + " "}</span></span>
          )
        }
        <button className="rightButton">Send</button>
      </div>
      {/* <img src={image.url} height="300px" width="300px" alt="" /> */}
    </div>
  );
};

export default NewPost;
