import React from "react";

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
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            color: "white",
            fontFamily: "Garamond Light",
            fontSize: "62px",
            lineHeight: "1",
          }}
        >
          {title}
        </div>
        {/* TODO: make title adjustable to the text size*/}
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

export default BookCover;
