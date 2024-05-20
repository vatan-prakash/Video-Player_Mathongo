"use client"
import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onTimeUpdate }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current) {
                onTimeUpdate(playerRef.current.getCurrentTime());
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [onTimeUpdate]);

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <>
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={(event) => (playerRef.current = event.target)}
                className="w-full"
            />
            <div className='flex flex-col gap-2 mt-4'>
                <div className='text-[18px]'>Video title goes here</div>
                <div className='text-[14px] text-[#475467]'>This is the description of the video</div>
            </div>
        </>
    );
};

export default VideoPlayer;
