
"use client"
import { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Notes from '../components/Notes';
import pako from 'pako';

const decompressData = (data) => {
  try {
    const decompressedData = pako.inflate(atob(data), { to: 'string' });
    return JSON.parse(decompressedData);
  } catch (e) {
    console.error("Failed to decompress data:", e);
    return {};
  }
};

export default function Home() {
  const [videoId, setVideoId] = useState('M7lc1UVf-VE');
  const [currentTime, setCurrentTime] = useState(0);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(decompressData(savedNotes));
    }
  }, []);

  return (
    <div className="p-4 w-[80%] mx-auto">
      <h1 className='text-[18px] mb-2'>Video Player with Notes</h1>
      <input
        type="text"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        placeholder="Enter YouTube Video ID"
        className="w-full p-2 border rounded mb-4"
      />
      <VideoPlayer videoId={videoId} onTimeUpdate={setCurrentTime} />
      <Notes videoId={videoId} currentTime={currentTime} notes={notes} setNotes={setNotes} />
    </div>
  );
}
