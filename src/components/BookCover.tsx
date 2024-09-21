import React from "react";

interface BookCoverProps {
  title: string;
  subtitle: string;
  author: string;
  color: string;
  animalImage: string;
}

const BookCover = ({
  title,
  subtitle,
  author,
  color,
  animalImage,
}: BookCoverProps) => {
  return (
    <div
      id="book-cover"
      className="relative"
      style={{ width: "500px", height: "700px", backgroundColor: "#fff" }}
    >
      {/* Color Block */}
      <div
        className="absolute left-0 top-0 h-1/4 w-full"
        style={{ backgroundColor: color }}
      ></div>
      {/* Animal Image */}
      {animalImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/${animalImage}`}
          alt="Animal"
          className="absolute left-1/2 top-10 z-10 max-h-64 -translate-x-1/2 transform"
        />
      )}
      {/* Text Content */}
      <div className="absolute bottom-20 w-full px-4 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h2 className="mt-2 text-xl text-gray-600">{subtitle}</h2>
        <p className="mt-4 text-lg text-gray-700">{author}</p>
      </div>
      {/* ORLY Logo */}
      <div className="absolute bottom-4 right-4 font-semibold text-gray-500">
        O RLY?
      </div>
    </div>
  );
};

export default BookCover;
