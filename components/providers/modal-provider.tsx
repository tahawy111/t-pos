"use client";

import { useEffect, useState } from "react";
import DeleteProductModal from "@/components/modals/delete-product-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <DeleteProductModal />
    </>
  );
};

export default ModalProvider;
