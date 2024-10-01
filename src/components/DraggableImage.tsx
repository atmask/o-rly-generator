import React, { useState } from "react";
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
  // State for image dimensions
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: baseDimension, height: baseDimension });

  // Initial position for the image
  const defaultPosition = { x: 80, y: 40 };

  return (
    <Draggable
      bounds="parent"
      defaultPosition={defaultPosition}
      defaultClassName="cursor-grab"
      defaultClassNameDragging="cursor-grabbing"
    >
      <Resizable
        size={{ width: imageDimensions.width, height: imageDimensions.height }}
        onResizeStop={(_e, _direction, _ref, d) => {
          setImageDimensions({
            width: imageDimensions.width + d.width,
            height: imageDimensions.height + d.height,
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
