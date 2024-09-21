import React, { useState } from "react";
import BookCover from "./BookCover";
import html2canvas from "html2canvas";

const CoverEditor = () => {
  // State variables
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [color, setColor] = useState<string>("#ffffff");
  const [animalImage, setAnimalImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to handle saving the book cover as an image
  const handleSave = () => {
    const element = document.getElementById("book-cover");
    if (element) {
      setIsLoading(true);
      html2canvas(element)
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = "orly-book-cover.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error generating image:", error);
          setIsLoading(false);
          alert("An error occurred while generating the image.");
        });
    }
  };

  // List of animal images
  const animalImages = [
    { name: "Owl", file: "1.png" },
    { name: "Fox", file: "2.png" },
    // Add more animals here
  ];

  return (
    <div className="flex flex-col md:flex-row md:space-x-8">
      {/* Left Side: Controls */}
      <div className="md:w-1/2">
        <h1 className="mb-4 text-2xl font-bold">ORLY Book Cover Generator</h1>
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="mb-1 block text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book title"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          {/* Subtitle Input */}
          <div>
            <label className="mb-1 block text-gray-700">Subtitle:</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          {/* Author Input */}
          <div>
            <label className="mb-1 block text-gray-700">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          {/* Color Picker */}
          <div>
            <label className="mb-1 block text-gray-700">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-full"
            />
          </div>
          {/* Animal Image Selector */}
          <div>
            <label className="mb-1 block text-gray-700">Animal Image:</label>
            <select
              value={animalImage}
              onChange={(e) => setAnimalImage(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
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
            className={`mt-4 w-full rounded-md py-2 font-semibold text-white ${
              !title || !animalImage || isLoading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Processing..." : "Save Cover"}
          </button>
        </div>
      </div>

      {/* Right Side: Book Cover Preview */}
      <div className="mt-8 flex items-start justify-center md:mt-0 md:w-1/2">
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
