import React, { useState, useEffect } from "react";
import { Button, Input, Row, Col } from 'antd';

const VideoPlayerList = () => {
  const [videos, setVideos] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [add,setadd]=useState([]);

  // Play the video when the user clicks on it
  const handleVideoClick = (videoUrl) => {
    const videoPlayer = document.getElementById("video");
    videoPlayer.innerHTML = `<iframe width="400" height="300" src="${videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  };

  // Add a new video to the list when the user clicks on "Add Video"
  const handleAddVideo = () => {
    const newVideo = {
      title: "New Video",
      description: "A newly added video",
      url: newVideoUrl,
      id: videos.length + 1
    };
    setVideos([...videos, newVideo]);
    setNewVideoUrl("");
  }
  const addvideo = () => {
    const newVideo = {
      title: "New Video",
      description: "A newly added video",
      url: newVideoUrl,
      id: add.length + 1
    };
    setadd([...add, newVideo]);
    setNewVideoUrl("");
  }
  const handleNewVideoUrlChange = (event) => {
    setNewVideoUrl(event.target.value);
  };

  return (
  <>
    <div className="video1">
      <div className="block center">
        <h2>Competetion/rolling examples</h2>
        {videos.map((video) => (
          <div key={video.id} className='center' onClick={() => handleVideoClick(video.url)}>
            <video src={video.url} controls></video>
          </div>
        ))}
      </div>
      <div className="block center">
        <h2>Instructional</h2>
        {add.map((video) => (
          <div key={video.id} className='center' onClick={() => handleVideoClick(video.url)}>
            <video src={video.url} controls></video>
          </div>
        ))}
      </div>
    </div>
    <div className="center">
      <Row>
        <Col span={8}></Col>
        <Col span={5} >
        <Input type="text" id="newVideoUrl" name="newVideoUrl" value={newVideoUrl} placeholder="Paste Video Link Here" onChange={handleNewVideoUrlChange} />
        </Col>
        <Col span={2}>
          <Button type="default" onClick={handleAddVideo}>Upload</Button>
          <Button type="default" style={{marginLeft: '20px'}} onClick={addvideo}>+</Button>
        </Col>
      </Row>
      <div id="video"></div>
    </div>
  </>
  );};

export default VideoPlayerList;