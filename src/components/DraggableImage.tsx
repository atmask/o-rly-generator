import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";
import { Resizable } from "re-resizable";
import { cn } from "~/lib/utils";

interface DraggableImageProps {
  src: string;
  alt: string;
  baseDimension: number;
  maxDimension: number;
  style?: React.CSSProperties;
  isGeneratingImage: boolean;
}

const DraggableImage = ({
  src,
  alt,
  baseDimension,
  maxDimension,
  style,
  isGeneratingImage,
}: DraggableImageProps) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Load the image to get its natural dimensions
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const ar = img.naturalWidth / img.naturalHeight;

      // Set initial dimensions based on aspect ratio
      let width, height;
      if (ar >= 1) {
        width = baseDimension;
        height = baseDimension / ar;
      } else {
        width = baseDimension * ar;
        height = baseDimension;
      }

      setImageDimensions({
        width,
        height,
      });
    };
  }, [src, baseDimension]);

  // Initial position for the image
  const defaultPosition = { x: 80, y: 40 };

  if (!imageDimensions) {
    return null;
  }

  return (
    <Draggable
      bounds="parent"
      defaultPosition={defaultPosition}
      defaultClassName="cursor-grab"
      defaultClassNameDragging="cursor-grabbing"
    >
      <Resizable
        size={{ width: imageDimensions.width, height: imageDimensions.height }}
        onResizeStop={(_e, _direction, _ref, delta) => {
          setImageDimensions({
            width: imageDimensions.width + delta.width,
            height: imageDimensions.height + delta.height,
          });
        }}
        maxWidth={maxDimension}
        maxHeight={maxDimension}
        lockAspectRatio={true}
        style={style}
        className={cn(
          "relative border border-transparent",
          isGeneratingImage ? "" : "border-dashed hover:border-gray-500",
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={imageDimensions.width}
          height={imageDimensions.height}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Resizable>
    </Draggable>
  );
};

export default DraggableImage;
