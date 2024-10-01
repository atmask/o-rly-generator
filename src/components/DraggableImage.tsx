import React, { useState } from "react";
import Image from "next/image";

interface DraggableImageProps {
  src: string;
  alt: string;
  maxDimension: number;
  parentWidth: number;
  parentHeight: number;
  style?: React.CSSProperties;
}

const DraggableImage = ({
  src,
  alt,
  maxDimension,
  parentWidth,
  parentHeight,
  style,
}: DraggableImageProps) => {
  // State for dragging the image
  const [imagePosition, setImagePosition] = useState<{ x: number; y: number }>({
    x: 80,
    y: 40,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // State for image dimensions
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  // Event handlers for dragging the image
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Constrain the image within the parent boundaries
      const minX = 0;
      const minY = 0;
      const maxX = parentWidth - imageDimensions.width;
      const maxY = parentHeight - imageDimensions.height;

      setImagePosition({
        x: Math.max(minX, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers for dragging
  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    setIsDragging(true);
    const touch = e.touches[0];
    if (!touch) {
      setIsDragging(false);
      return;
    }
    setDragStart({
      x: touch.clientX - imagePosition.x,
      y: touch.clientY - imagePosition.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.touches[0];
      if (!touch) {
        setIsDragging(false);
        return;
      }
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;

      // Constrain the image within the parent boundaries
      const minX = 0;
      const minY = 0;
      const maxX = parentWidth - imageDimensions.width;
      const maxY = parentHeight - imageDimensions.height;

      setImagePosition({
        x: Math.max(minX, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY)),
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

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

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: parentWidth,
        height: parentHeight,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <Image
        src={src}
        alt={alt}
        height={maxDimension}
        width={maxDimension}
        style={{
          position: "absolute",
          top: `${imagePosition.y}px`,
          left: `${imagePosition.x}px`,
          width: `${imageDimensions.width}px`,
          height: `${imageDimensions.height}px`,
          cursor: "move",
          touchAction: "none",
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
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
};

export default DraggableImage;
