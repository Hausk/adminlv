"use client";

import { Card, CardBody, ScrollShadow, cn } from "@nextui-org/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ImageCard from "./image-card";

const Dropzone = ({
  selectedImages,
  setSelectedImages,
  uploadProgress,
  uploadInfo,
}: {
  selectedImages: any[];
  setSelectedImages: any;
  uploadProgress: any[];
  uploadInfo: any[];
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedImages((prevState: any[]) => [...prevState, ...acceptedFiles]);
    },
    [setSelectedImages]
  );

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prevState: any[]) =>
      prevState.filter((_: any, i: number) => i !== index)
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card
      className={cn(
        isDragActive
          ? "bg-default/50 border-dashed border-primary"
          : "bg-default border-collapse border-default",
        "m-auto border-1"
      )}
    >
      <CardBody>
        <ScrollShadow
          hideScrollBar
          className="w-[100%] h-[300px] lg:w-[500px] relative"
        >
          {selectedImages.length == 0 && (
            <div
              {...getRootProps({
                className:
                  "dropzone w-full h-full flex justify-center items-center",
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-center m-auto">
                  Dépose le(s) image(s) ici ...
                </p>
              ) : (
                <p className="text-center m-auto">
                  Glisse-dépose de(s) image(s) ici, ou clique pour en
                  sélectionner
                </p>
              )}
            </div>
          )}
          {selectedImages.length > 0 && (
            <div className="w-full flex flex-wrap">
              <div
                {...getRootProps({
                  className:
                    "aspect-square rounded-lg overflow-hidden w-1/2 lg:w-1/3 p-2 flex relative",
                })}
              >
                <input {...getInputProps()} />
                <div className="m-auto border aspect-square w-full flex rounded-md">
                  <p className="m-auto">+</p>
                </div>
              </div>
              {selectedImages.map((image: any, index: number) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden w-1/2 lg:w-1/3 p-2 flex relative"
                >
                  <ImageCard
                    image={image}
                    onDelete={() => handleDeleteImage(index)}
                    progress={uploadProgress[index]}
                    info={uploadInfo[index]}
                  />
                </div>
              ))}
            </div>
          )}
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};

export default Dropzone;
