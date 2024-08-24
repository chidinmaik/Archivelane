import React from 'react';

const MusicPlayer = () => {
  return (
   
    <div className="flex flex-col h-screen p-4 md:p-8 lg:p-12">
      
       <div className="flex bg-black-200 hover:bg-pink-500 text-yellow">
      <ul>
      <li>happy
      </li>
      <li>boy</li>
      </ul>
    </div>
    
      <h1 className="text-5xl font-light text-center md:text-4xl lg:text-5xl">Music Player</h1>
      <div className="flex flex-col mt-4 md:mt-8 lg:mt-12">
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8">
          Play
        </button>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 lg:py-4 lg:px-8">
          Pause
        </button>
      </div>
      <div className="flex flex-col mt-4 md:mt-8 lg:mt-12">
        <p className="text-lg text-center md:text-xl lg:text-2xl">Song Title</p>
        <p className="text-sm text-center md:text-base lg:text-lg">Artist Name</p>
      </div>
    </div>
  );
};

export default MusicPlayer;