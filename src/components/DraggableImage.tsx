import React, { useState } from "react";
import Draggable from "react-draggable";
import Image from "next/image";

interface DraggableImageProps {
  src: string;
  alt: string;
  maxDimension: number;
  style?: React.CSSProperties;
}

const DraggableImage = ({
  src,
  alt,
  maxDimension,
  style,
}: DraggableImageProps) => {
  // State for image dimensions
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  // Function to calculate scaled dimensions
  const getScaledDimensions = (
    naturalWidth: number,
    naturalHeight: number,
    maxWidth: number,
    maxHeight: number,
  ) => {
    const widthRatio = maxWidth / naturalWidth;
    const heightRatio = maxHeight / naturalHeight;
    const ratio = Math.min(widthRatio, heightRatio, 1); // Ensure we don't upscale
    return {
      width: naturalWidth * ratio,
      height: naturalHeight * ratio,
    };
  };

  // Initial position for the image
  const defaultPosition = { x: 80, y: 40 };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={defaultPosition}
      defaultClassName="cursor-grab"
      defaultClassNameDragging="cursor-grabbing"
    >
      <Image
        src={src}
        alt={alt}
        height={maxDimension}
        width={maxDimension}
        style={{
          width: `${imageDimensions.width}px`,
          height: `${imageDimensions.height}px`,
          ...style,
        }}
        onLoad={(e) => {
          const img = e.currentTarget;
          const { width, height } = getScaledDimensions(
            img.naturalWidth,
            img.naturalHeight,
            maxDimension,
            maxDimension,
          );
          setImageDimensions({ width, height });
        }}
        draggable={false}
      />
    </Draggable>
  );
};

export default DraggableImage;
