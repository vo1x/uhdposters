import { useState } from 'react';
import axios from 'axios';

import { UseImgDownloaderReturn } from '../types/interfaces';

const useImageDownloader: () => UseImgDownloaderReturn = () => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadImage = async (url: string, fileName: string) => {
    setIsDownloading(true);
    try {
      const response = await axios.get(url, {
        responseType: 'blob'
      });

      const imageObjectURL = URL.createObjectURL(response.data);

      const link = document.createElement('a');
      link.href = imageObjectURL;

      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
    } catch (error) {
      console.error('Error fetching or downloading image:', error);
    }
  };

  return { downloadImage, isDownloading };
};

export default useImageDownloader;
