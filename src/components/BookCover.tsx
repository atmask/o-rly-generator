import React, { useEffect, useRef, useState } from "react";

export interface BookCoverProps {
  title: string;
  subtitle: string;
  author: string;
  color: string;
  animalImage: string;
  topText: string;
  guideTextPlacement: "top_left" | "top_right" | "bottom_left" | "bottom_right";
}

const BookCover = ({
  title,
  subtitle,
  author,
  color,
  animalImage,
  topText,
  guideTextPlacement,
}: BookCoverProps) => {
  // Subtitle positioning based on guideTextPlacement
  let subtitleStyle: React.CSSProperties = {};

  switch (guideTextPlacement) {
    case "top_left":
      subtitleStyle = {
        position: "absolute",
        top: "370px",
        left: "20px",
        fontFamily: "Garamond Light Italic",
        fontSize: "34px",
        color: "black",
      };
      break;
    case "top_right":
      subtitleStyle = {
        position: "absolute",
        top: "370px",
        right: "20px",
        fontFamily: "Garamond Light Italic",
        fontSize: "34px",
        color: "black",
        textAlign: "right",
      };
      break;
    case "bottom_left":
      subtitleStyle = {
        position: "absolute",
        top: "520px",
        left: "20px",
        fontFamily: "Garamond Light Italic",
        fontSize: "34px",
        color: "black",
      };
      break;
    case "bottom_right":
    default:
      subtitleStyle = {
        position: "absolute",
        top: "520px",
        right: "20px",
        fontFamily: "Garamond Light Italic",
        fontSize: "34px",
        color: "black",
        textAlign: "right",
      };
      break;
  }

  // State to hold adjusted title and font size
  const [adjustedTitle, setAdjustedTitle] = useState<string>(title);
  const [titleFontSize, setTitleFontSize] = useState<number>(76);

  // Ref for measuring text width
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Create canvas if it doesn't exist
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    const { adjustedTitle, fontSize } = adjustTitle(title, canvasRef.current);
    setAdjustedTitle(adjustedTitle);
    setTitleFontSize(fontSize);
  }, [title]);

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
          fontFamily: "Garamond Light Italic",
          fontSize: "20px",
          textAlign: "center",
          lineHeight: "1.1",
        }}
      >
        {topText}
      </div>

      {/* Animal Image */}
      {animalImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/${animalImage}`}
          alt="Animal"
          style={{
            position: "absolute",
            top: "40px",
            left: "80px",
            width: "395px",
            height: "395px",
            zIndex: "1",
          }}
          // TODO: make image fit
          // TODO: allow to move the image slightly
        />
      )}

      {/* Title Block */}
      <div
        style={{
          position: "absolute",
          top: "400px",
          left: "20px",
          width: "460px",
          backgroundColor: color,
          paddingTop: "25px",
          paddingBottom: "25px",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            color: "white",
            fontFamily: "Garamond Light",
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
      <div
        style={{
          position: "absolute",
          left: "20px",
          bottom: "20px",
          fontFamily: "Helvetica Neue Medium",
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
            fontFamily: "Helvetica Bold",
            fontSize: "16px",
            color: color,
            lineHeight: "1",
          }}
        >
          ?
        </span>
      </div>

      {/* Author */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          fontFamily: "Garamond Light Italic",
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

// Extracted adjustTitle function
const adjustTitle = (
  title: string,
  canvas: HTMLCanvasElement | null,
): { adjustedTitle: string; fontSize: number } => {
  const MIN_FONT_SIZE = 36; // Minimum font size
  const MAX_FONT_SIZE = 76; // Maximum font size
  const MAX_TITLE_HEIGHT = 115; // Maximum title block height in pixels
  const LINE_HEIGHT = 0.9; // Line height multiplier
  const MAX_WIDTH = 460 - 40; // Title block width minus margins (20px on each side)

  const fontFamily = "Garamond Light";
  const context = canvas?.getContext("2d");
  if (!context) return { adjustedTitle: title, fontSize: MIN_FONT_SIZE };

  const words = title.split(" ");
  let optimalFontSize = MIN_FONT_SIZE;
  let optimalTitle = title;

  // Iterate from maximum to minimum font size
  for (let fontSize = MAX_FONT_SIZE; fontSize >= MIN_FONT_SIZE; fontSize--) {
    context.font = `${fontSize}px ${fontFamily}`;

    // Generate all possible line break combinations
    const lineBreakCombos = generateLineBreaks(words);

    for (const lineCombo of lineBreakCombos) {
      const lines = lineCombo.split("\n");

      // Check if total height exceeds maximum allowed
      const totalHeight = lines.length * fontSize * LINE_HEIGHT;
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
        // Since we're iterating from largest font size, we can break early
        break;
      }
    }

    if (optimalFontSize === fontSize) {
      // Optimal font size found, no need to check smaller sizes
      break;
    }
  }

  return { adjustedTitle: optimalTitle, fontSize: optimalFontSize };
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
