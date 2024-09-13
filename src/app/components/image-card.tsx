import { XIcon, CheckCircle } from "lucide-react";
import Image from "next/image";

const ImageCard = ({ image, onDelete, progress, info }: any) => {
  return (
    <>
      <Image
        src={URL.createObjectURL(image)}
        alt=""
        className="m-auto hover:animate-pulse aspect-square w-full rounded-lg h-full"
        width={100}
        height={100}
      />
      {progress > 0 && progress < 100 && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-3/4 h-2 bg-gray-300">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {progress === 100 && (
        <CheckCircle className="absolute top-2 right-2 text-green-500 w-6 h-6" />
      )}
      {info && (
        <div className="p-2">
          <p>Name: {info.original_filename}</p>
          <p>Size: {(info.bytes / 1024).toFixed(2)} KB</p>
        </div>
      )}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full flex w-6 h-6 z-50"
      >
        <XIcon className="m-auto" />
      </button>
    </>
  );
};

export default ImageCard;
