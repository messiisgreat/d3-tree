import React, { useState, useEffect } from "react";
import { Button, Input, Row, Col } from 'antd';


const VideoPlayerList = () => {
  const [videos, setVideos] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [add,setadd]=useState([]);

  // Play the video when the user clicks on it
  const handleVideoClick = (videoUrl, redirectUrl) => {
    // window.location.href = redirectUrl;
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
    <div className="container grid grid-cols-2 gap-4 mx-auto my-4">
      <div className="col-span-1">
        <p className="text-2xl text-center">Competetion/rolling examples</p>
        <div className="h-60 border-dotted border-2 border-gray-500 rounded-lg my-1 flex flex-col gap-4 overflow-y-auto">
          {videos.map((video) => 
            video.url.includes("youtube") ? <iframe src={video.url} className="w-full px-4" /> :
            video.url.includes("cloudflarestream") ? <iframe src={video.url} className="w-full px-4" /> :
            <video src={video.url} className="w-full px-4" />
          )}
        </div>
        <div className="flex items-center gap-4">
          <Input size="large" style={{height: "40px"}} type="text" id="newVideoUrl" name="newVideoUrl" value={newVideoUrl} placeholder="Paste Video Link Here" onChange={handleNewVideoUrlChange} />
          <Button type="default" size="middle" onClick={handleAddVideo}>Upload</Button>
        </div>
      </div>
      <div className="col-span-1">
        <p className="text-2xl text-center">Instructional</p>
        <div className="h-60 border-dotted border-2 border-gray-500 rounded-lg my-1 flex flex-col gap-4 overflow-y-auto">
          {/* {add.map((video) => (
            <div key={video.id} className='center' onClick={() => handleVideoClick(video.url)}>
              <video src={video.url} controls></video>
            </div>
          ))} */}
          {add.map((video) => 
            video.url.includes("youtube") ? <iframe src={video.url} className="w-full px-4" /> :
            video.url.includes("cloudflarestream") ? <iframe src={video.url} className="w-full px-4" /> :
            <video src={video.url} className="w-full px-4" />
          )}
        </div>
        <div className="flex justify-center">
          <Button type="default" size="middle" onClick={addvideo}>+</Button>
        </div>
      </div>
    </div>
  );};

export default VideoPlayerList;