'use client'

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = () => {
    const [selectedImages, setSelectedImages] = useState([]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      acceptedFiles.forEach((file) => {
        setSelectedImages((prevState) => [...prevState, file]);
      });
    }, []);
  
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({ onDrop });
  return (
    <div className='w-screen'>
      <div className="bg-red-500 w-full" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop file(s) here ...</p>
        ) : (
          <p>Drag and drop file(s) here, or click to select files</p>
        )}
      </div>
      <div className='w-full grid grid-cols-4 grid-flow-row gap-4'>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
          ))}
      </div>
      <button onClick={() => console.log(selectedImages)}>Confirm</button>
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #ddd',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: '20px',
  },
  cardContainer: {
    flex: '1 0 21%', // Adjust to make sure cards fit well
    maxWidth: '150px',
  },
  image: {
    width: '100%',
    textAlign: 'center',
  },
};

export default Dropzone;
