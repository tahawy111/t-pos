"use client";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import { FC, useId, useState } from "react";

interface ProductImagesProps {
  images: ImageType[];
}

const ProductImages: FC<ProductImagesProps> = ({ images }) => {

  const [imgIndex, setImgIndex] = useState<number>(0);
  const DevImgsId = useId();

  return (
    <div className="flex justify-center items-center flex-col p-5">
      <div className="w-[500px] h-[500px] border">
        <Image
          className="w-full h-[500px] p-5 object-contain"
          src={images[imgIndex].url}
          alt={`Image ${imgIndex}`}
          width={500}
          height={500}
        />
        <div className="flex items-center">
          <svg
            onClick={() =>
              (document.getElementById(DevImgsId)!.scrollLeft -= 100)
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-12 h-12 cursor-pointer select-none ${
              images.length < 3 && "pointer-events-none opacity-50"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <div
            id={DevImgsId}
            className="flex w-full overflow-auto scrollbar-hide gap-3 scrollbar-hide space-y-2"
          >
            {images.map((img, index) => (
              <Image
                key={index}
                src={img.url}
                onClick={() => setImgIndex(index)}
                className={cn("w-32 h-32 object-contain rounded-sm cursor-pointer border-2 mx-1",index === imgIndex && "border-4 border-blue-500/30")}
                alt={`Thumbnail ${index}`}
                width={500}
                height={500}
              />
            ))}
          </div>
          <svg
            onClick={() =>
              (document.getElementById(DevImgsId)!.scrollLeft += 100)
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-12 h-12 cursor-pointer select-none ${
              images.length < 3 && "pointer-events-none opacity-50"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
