import React from 'react';

interface BookCoverProps {
  title: string;
  subtitle: string;
  author: string;
  color: string;
  animalImage: string;
}

const BookCover: React.FC<BookCoverProps> = ({
                                               title,
                                               subtitle,
                                               author,
                                               color,
                                               animalImage,
                                             }) => {
  return (
      <div
          id="book-cover"
          className="relative"
          style={{ width: '500px', height: '700px', backgroundColor: '#fff' }}
      >
        {/* Color Block */}
        <div
            className="absolute top-0 left-0 w-full h-1/4"
            style={{ backgroundColor: color }}
        ></div>
        {/* Animal Image */}
        {animalImage && (
            <img
                src={`${process.env.PUBLIC_URL}/assets/images/${animalImage}`}
                alt="Animal"
                className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 max-h-64"
            />
        )}
        {/* Text Content */}
        <div className="absolute bottom-20 w-full text-center px-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <h2 className="text-xl text-gray-600 mt-2">{subtitle}</h2>
          <p className="text-lg mt-4 text-gray-700">{author}</p>
        </div>
        {/* ORLY Logo */}
        <div className="absolute bottom-4 right-4 text-gray-500 font-semibold">
          O RLY?
        </div>
      </div>
  );
};

export default BookCover;
