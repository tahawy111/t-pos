"use client";

import { useState } from "react";
import axios from "axios";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DeleteProductModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { apiUrl, query } = data;
  const router = useRouter()

  const isModalOpen = isOpen && type === "deleteProduct";

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      const response = await axios.delete(url);

      onClose();
      router.push("/products")
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Product
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want to do this? <br />
              The product will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <Button disabled={isLoading} onClick={onClose} variant={"ghost"}>
                Cancel
              </Button>
              <Button
                variant={"default"}
                onClick={onClick}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteProductModal;
