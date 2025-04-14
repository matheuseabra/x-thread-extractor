import { Tweet } from "@shared/schema";
import React, { useState } from "react";

interface ThreadItemProps {
  post: Tweet;
  authorProfilePicture?: string;
  authorName?: string;
  authorUsername?: string;
  isBlueVerified?: boolean;
  isLastItem?: boolean;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ 
  post, 
  authorProfilePicture, 
  authorName,
  authorUsername,
  isBlueVerified,
  isLastItem
}) => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (url: string) => {
    setLoadedImages(prev => ({ ...prev, [url]: true }));
  };

  return (
    <div className="thread-item relative bg-black border border-border rounded-xl p-5 pl-16">
      <div className="absolute left-5 top-5 w-8 h-8 rounded-full overflow-hidden border border-border z-10">
        {authorProfilePicture ? (
          <img
            src={authorProfilePicture}
            alt="Author profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {!isLastItem && (
        <div className="absolute left-[35px] top-[40px] bottom-0 w-[2px] bg-border" />
      )}
      
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center gap-1">
          <span className="font-bold text-white">{authorName}</span>
          {isBlueVerified && (
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
            </svg>
          )}
        </div>
        <span className="text-gray-400">@{authorUsername}</span>
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
