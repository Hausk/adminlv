"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import Dropzone from "./dropzone";
import { saveImages, uploadImageToCloudinary } from "@/actions/cloudinary";
import { prisma } from "@/lib/primsa";

export default function ModalDropzone() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [images, setImages] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploadInfo, setUploadInfo] = useState<any[]>([]);
  const [value, setValue] = React.useState("");

  const handleCancel = () => {
    setImages([]); // Efface les images
    setUploadProgress([]); // Réinitialise la progression
    setUploadInfo([]); // Réinitialise les informations
    onOpenChange(false); // Ferme la modal
  };

  const handleSave = async () => {
    const progressArray = new Array(images.length).fill(0);
    const infoArray = new Array(images.length).fill(null);

    setUploadProgress(progressArray);
    setUploadInfo(infoArray);

    const readerPromises = images.map((image) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
      });
    });
    // Sauvegarder les informations des images dans la base de données
    try {
      const base64Images = await Promise.all(readerPromises);
      const savedImages = await saveImages(base64Images);

      setUploadProgress(savedImages.map(() => 100));
      setUploadInfo(savedImages);
      // Fermez la modal après le téléchargement
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        <span className="hidden lg:block">Ajouter</span> <PlusIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"xl"}>
        <ModalContent className="w-2/3">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-foreground">
                Upload des images
                <Input
                  value={value}
                  type="text"
                  label="Categorie"
                  variant="bordered"
                  errorMessage="Pas bon"
                  onValueChange={setValue}
                  className="w-full"
                />
              </ModalHeader>
              <ModalBody className="text-foreground">
                <Dropzone
                  selectedImages={images}
                  setSelectedImages={setImages}
                  uploadProgress={uploadProgress}
                  uploadInfo={uploadInfo}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleCancel}>
                  Annuler
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Sauvegarder
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
