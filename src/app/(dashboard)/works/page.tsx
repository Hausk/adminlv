import { Button } from "@nextui-org/button";
import Dropzone from "../../components/dropzone";
import { PlusIcon } from "lucide-react";
import ModalDropzone from "@/app/components/modal-dropzone";

export default function Works() {
    return (
        <div className="w-full h-full">
          <div className="flex p-5 lg:px-10 justify-between w-full">
            <h1 className="text-3xl font-bold">Photo Box</h1>
            <ModalDropzone />
          </div>
          <div className="grid grid-cols-3 grid-flow-row gap-4">
          </div>
      </div>
    )
}