import { Tweet } from "@shared/schema";
import React, { useState } from "react";

interface ThreadItemProps {
  post: Tweet;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ post }) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (url: string) => {
    setLoadedImages(prev => ({ ...prev, [url]: true }));
  };

  return (
    <div className="thread-item relative bg-black border border-gray-800 rounded-xl p-5 pl-16">
      <div className="absolute left-5 top-5 w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold">
        {post.index}
      </div>
      
      <div className="thread-text mb-3 text-white">
        <p>{post.text}</p>
      </div>
      
      {post.images && post.images.length > 0 && (
        <div className={`thread-images grid ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mt-3`}>
          {post.images.map((img, index) => (
            <div key={index} className="relative">
              {!loadedImages[img.url] && (
                <div className="absolute inset-0 bg-gray-900 animate-pulse rounded-lg" />
              )}
              <img
                src={img.url}
                alt={`Image ${index + 1} from tweet ${post.index}`}
                className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
                  loadedImages[img.url] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(img.url)}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="text-gray-400 text-xs mt-3">{post.time}</div>
    </div>
  );
};

export default ThreadItem;
