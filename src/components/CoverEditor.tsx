import React, { useState } from 'react';
import BookCover from './BookCover';
import html2canvas from 'html2canvas';

const CoverEditor: React.FC = () => {
  // State variables
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [color, setColor] = useState<string>('#ffffff');
  const [animalImage, setAnimalImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to handle saving the book cover as an image
  const handleSave = () => {
    const element = document.getElementById('book-cover');
    if (element) {
      setIsLoading(true);
      html2canvas(element)
      .then((canvas) => {
        const link = document.createElement('a');
        link.download = 'orly-book-cover.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error generating image:', error);
        setIsLoading(false);
        alert('An error occurred while generating the image.');
      });
    }
  };

  // List of animal images
  const animalImages = [
    { name: 'Owl', file: '1.png' },
    { name: 'Fox', file: '2.png' },
    // Add more animals here
  ];

  return (
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left Side: Controls */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">ORLY Book Cover Generator</h1>
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-gray-700 mb-1">Title:</label>
              <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title"
                  className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {/* Subtitle Input */}
            <div>
              <label className="block text-gray-700 mb-1">Subtitle:</label>
              <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Enter subtitle"
                  className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {/* Author Input */}
            <div>
              <label className="block text-gray-700 mb-1">Author:</label>
              <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            {/* Color Picker */}
            <div>
              <label className="block text-gray-700 mb-1">Color:</label>
              <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10"
              />
            </div>
            {/* Animal Image Selector */}
            <div>
              <label className="block text-gray-700 mb-1">Animal Image:</label>
              <select
                  value={animalImage}
                  onChange={(e) => setAnimalImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select an animal</option>
                {animalImages.map((animal) => (
                    <option key={animal.file} value={animal.file}>
                      {animal.name}
                    </option>
                ))}
              </select>
            </div>
            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={!title || !animalImage || isLoading}
                className={`w-full py-2 mt-4 text-white font-semibold rounded-md ${
                    !title || !animalImage || isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
              {isLoading ? 'Processing...' : 'Save Cover'}
            </button>
          </div>
        </div>

        {/* Right Side: Book Cover Preview */}
        <div className="md:w-1/2 flex justify-center items-start mt-8 md:mt-0">
          <BookCover
              title={title}
              subtitle={subtitle}
              author={author}
              color={color}
              animalImage={animalImage}
          />
        </div>
      </div>
  );
};

export default CoverEditor;
