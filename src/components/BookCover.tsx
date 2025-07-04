import React, { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import DraggableImage from "./DraggableImage";

const garamondLight = localFont({
  src: "./fonts/Garamond-Light.ttf",
});
const garamondLightItalic = localFont({
  src: "./fonts/Garamond-Light-Italic.ttf",
});
const helveticaBold = localFont({
  src: "./fonts/Helvetica-Bold.ttf",
});
const helveticaNeueMedium = localFont({
  src: "./fonts/Helvetica-Neue-Medium.otf",
});

export interface BookCoverProps {
  topText: string;
  title: string;
  subtitle: string;
  author: string;
  color: string;
  animalImage: string;
  uploadedImage: string | null;
  subtitlePlacement: "top_left" | "top_right" | "bottom_left" | "bottom_right";
  isGeneratingImage: boolean;
}

const BookCover = ({
  topText,
  title,
  subtitle,
  author,
  color,
  animalImage,
  uploadedImage,
  subtitlePlacement,
  isGeneratingImage,
}: BookCoverProps) => {
  // State to hold adjusted title, font size, and title block height
  const [adjustedTitle, setAdjustedTitle] = useState<string>(title);
  const [titleFontSize, setTitleFontSize] = useState<number>(76);
  const [titleBlockHeight, setTitleBlockHeight] = useState<number>(0);

  // Ref for measuring text width
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Create canvas if it doesn't exist
    canvasRef.current ??= document.createElement("canvas");

    const { adjustedTitle, fontSize, totalHeight } = adjustTitle(
      title,
      canvasRef.current,
    );
    setAdjustedTitle(adjustedTitle);
    setTitleFontSize(fontSize);
    setTitleBlockHeight(totalHeight);
  }, [title]);

  // Calculate positions
  const titleBlockTop = 400; // Initial top position of the title block
  const titleBlockPadding = 25; // Top and bottom padding
  const subtitleBottomTop =
    titleBlockTop + titleBlockHeight + titleBlockPadding * 2;

  // Subtitle positioning based on guideTextPlacement
  const subtitleStyle: React.CSSProperties = {
    position: "absolute",
    fontFamily: garamondLightItalic.style.fontFamily,
    fontSize: "34px",
    color: "black",
    lineHeight: "1",
    zIndex: 2,
  };

  switch (subtitlePlacement) {
    case "top_left":
      subtitleStyle.top = "365px";
      subtitleStyle.left = "20px";
      break;
    case "top_right":
      subtitleStyle.top = "365px";
      subtitleStyle.right = "20px";
      subtitleStyle.textAlign = "right";
      break;
    case "bottom_left":
      subtitleStyle.top = `${subtitleBottomTop}px`;
      subtitleStyle.left = "20px";
      break;
    case "bottom_right":
    default:
      subtitleStyle.top = `${subtitleBottomTop}px`;
      subtitleStyle.right = "20px";
      subtitleStyle.textAlign = "right";
      break;
  }

  return (
    <div
      id="book-cover"
      style={{
        position: "relative",
        width: "500px",
        height: "700px",
        backgroundColor: "#fff",
      }}
    >
      {/* Hidden canvas for text measurement */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Top Color Block */}
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "20px",
          width: "460px",
          height: "10px",
          backgroundColor: color,
        }}
      ></div>

      {/* Top Text */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "20px",
          width: "460px",
          zIndex: 2,
          fontFamily: garamondLightItalic.style.fontFamily,
          fontSize: "20px",
          textAlign: "center",
          lineHeight: "1.1",
        }}
      >
        {topText}
      </div>

      {/* Animal Image or Uploaded Image */}
      {(uploadedImage ?? animalImage) && (
        <DraggableImage
          src={uploadedImage ?? `./images/${animalImage}`}
          alt="Animal"
          baseDimension={395}
          maxDimension={500}
          style={{ position: "absolute", zIndex: 1 }}
          isGeneratingImage={isGeneratingImage}
        />
      )}

      {/* Title Block */}
      <div
        style={{
          position: "absolute",
          top: `${titleBlockTop}px`,
          left: "20px",
          width: "460px",
          backgroundColor: color,
        }}
      >
        <div
          style={{
            margin: "0",
            marginLeft: "20px",
            marginRight: "20px",
            paddingTop: "25px",
            paddingBottom: "25px",
            color: "white",
            fontFamily: garamondLight.style.fontFamily,
            fontSize: `${titleFontSize}px`,
            lineHeight: "0.9",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {adjustedTitle}
        </div>
      </div>

      {/* Subtitle */}
      <div style={subtitleStyle}>{subtitle}</div>

      {/* O RLY Logo */}
      {/* <div
        style={{
          position: "absolute",
          left: "20px",
          bottom: "20px",
          fontFamily: helveticaNeueMedium.style.fontFamily,
          fontSize: "28px",
          lineHeight: "1",
        }}
      >
        O RLY
        <span
          style={{
            position: "relative",
            bottom: "15px",
            right: "0px",
            fontFamily: helveticaBold.style.fontFamily,
            fontSize: "16px",
            color: color,
            lineHeight: "1",
          }}
        >
          ?
        </span>
      </div> */}

      {/* Author */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          fontFamily: garamondLightItalic.style.fontFamily,
          fontSize: "24px",
          textAlign: "right",
          lineHeight: "1",
        }}
      >
        {author}
      </div>
    </div>
  );
};

// Extracted adjustTitle function with truncation logic
const adjustTitle = (
  title: string,
  canvas: HTMLCanvasElement | null,
): { adjustedTitle: string; fontSize: number; totalHeight: number } => {
  const MIN_FONT_SIZE = 36; // Minimum font size
  const MAX_FONT_SIZE = 76; // Maximum font size
  const MAX_TITLE_HEIGHT = 115; // Maximum title block height in pixels
  const LINE_HEIGHT_MULTIPLIER = 0.9; // Line height multiplier
  const MAX_WIDTH = 460 - 40; // Title block width minus margins (20px on each side)

  const fontFamily = garamondLight.style.fontFamily;
  const context = canvas?.getContext("2d");
  if (!context)
    return { adjustedTitle: title, fontSize: MIN_FONT_SIZE, totalHeight: 0 };

  const words = title.split(" ");
  let optimalFontSize = MIN_FONT_SIZE;
  let optimalTitle = title;
  let optimalHeight = 0;

  // Iterate from maximum to minimum font size
  for (let fontSize = MAX_FONT_SIZE; fontSize >= MIN_FONT_SIZE; fontSize--) {
    context.font = `${fontSize}px ${fontFamily}`;

    // Generate all possible line break combinations
    const lineBreakCombos = generateLineBreaks(words);

    for (const lineCombo of lineBreakCombos) {
      const lines = lineCombo.split("\n");

      // Check if total height exceeds maximum allowed
      const totalHeight = lines.length * fontSize * LINE_HEIGHT_MULTIPLIER;
      if (totalHeight > MAX_TITLE_HEIGHT) {
        continue; // Skip this combination
      }

      const linesFit = lines.every(
        (line) => context.measureText(line).width <= MAX_WIDTH,
      );

      if (linesFit) {
        // Found a combination that fits
        optimalFontSize = fontSize;
        optimalTitle = lineCombo;
        optimalHeight = totalHeight;
        // Since we're iterating from largest font size, we can break early
        break;
      }
    }

    if (optimalHeight > 0) {
      // Optimal font size found, no need to check smaller sizes
      break;
    }
  }

  // If no fitting combination found, truncate the title
  if (optimalHeight === 0) {
    optimalFontSize = MIN_FONT_SIZE;
    context.font = `${optimalFontSize}px ${fontFamily}`;

    let truncatedTitle = title;
    while (true) {
      // Remove last word
      truncatedTitle = truncatedTitle.substring(
        0,
        truncatedTitle.lastIndexOf(" "),
      );
      if (!truncatedTitle) {
        truncatedTitle = title.substring(0, 10); // Fallback to first 10 characters
        break;
      }
      const testTitle = truncatedTitle + "...";
      const textWidth = context.measureText(testTitle).width;
      const totalHeight = optimalFontSize * LINE_HEIGHT_MULTIPLIER;
      if (textWidth <= MAX_WIDTH && totalHeight <= MAX_TITLE_HEIGHT) {
        optimalTitle = testTitle;
        optimalHeight = totalHeight;
        break;
      }
    }
  }

  return {
    adjustedTitle: optimalTitle,
    fontSize: optimalFontSize,
    totalHeight: optimalHeight,
  };
};

// Function to generate all possible line break combinations
const generateLineBreaks = (words: string[]): string[] => {
  const results: string[] = [];

  const totalWords = words.length;
  const maxLines = 3; // Maximum number of lines allowed

  // Generate combinations for 1 to maxLines
  for (let numLines = 1; numLines <= maxLines; numLines++) {
    const indices = getCombinations(totalWords - 1, numLines - 1);
    for (const breaks of indices) {
      const lines = [];
      let start = 0;
      for (const breakIndex of breaks) {
        lines.push(words.slice(start, breakIndex + 1).join(" "));
        start = breakIndex + 1;
      }
      lines.push(words.slice(start).join(" "));
      results.push(lines.join("\n"));
    }
  }

  return results;
};

// Function to get combinations of break positions
const getCombinations = (n: number, k: number): number[][] => {
  const results: number[][] = [];
  const combo: number[] = [];

  const backtrack = (start: number, k: number) => {
    if (k === 0) {
      results.push([...combo]);
      return;
    }
    for (let i = start; i < n; i++) {
      combo.push(i);
      backtrack(i + 1, k - 1);
      combo.pop();
    }
  };

  backtrack(0, k);
  return results;
};

export default BookCover;
