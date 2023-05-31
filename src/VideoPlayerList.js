import React, { useState, useEffect } from "react";
// import { Button } from 'react-bootstrap';
const VideoPlayerList = () => {
  const [videos, setVideos] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [add,setadd]=useState([]);
  // Fetch the videos from an API when the component mounts
 

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
      <input type="text" id="newVideoUrl" name="newVideoUrl" value={newVideoUrl} placeholder="Paste Video Link Here" onChange={handleNewVideoUrlChange} />
      <button onClick={handleAddVideo}>Upload</button>
      <button onClick={addvideo}>+</button>
      <div id="video"></div>
      </div>
    
    </>
  );
};

export default VideoPlayerList;