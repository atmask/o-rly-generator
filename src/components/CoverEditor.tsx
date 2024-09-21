import React, { useState } from "react";
import BookCover from "./BookCover";
import html2canvas from "html2canvas";

const CoverEditor = () => {
  // State variables
  const [topText, setTopText] = useState<string>(
    "Using funny cover to convince your colleagues",
  );
  const [title, setTitle] = useState<string>("Winning Arguments");
  const [subtitle, setSubtitle] = useState<string>("Pocket Reference");
  const [author, setAuthor] = useState<string>("@denitdao");
  const [guideTextPlacement, setGuideTextPlacement] = useState<
    "top_left" | "top_right" | "bottom_left" | "bottom_right"
  >("bottom_right");
  const [color, setColor] = useState<string>("#0a79b5");
  const [customColor, setCustomColor] = useState<string>("#000000");
  const [isCustomColor, setIsCustomColor] = useState<boolean>(false);
  const [animalImage, setAnimalImage] = useState<string>("69.png");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // List of animal images
  const animalImages = [
    { name: "Bear", file: "1.png" },
    { name: "Cat", file: "2.png" },
    { name: "Wolf", file: "3.png" },
    { name: "Cow", file: "4.png" },
    { name: "Horse", file: "5.png" },
    { name: "Deer", file: "6.png" },
    { name: "Monkey", file: "7.png" },
    { name: "Bat", file: "10.png" },
    { name: "Goat", file: "69.png" },
    // Add more animals here
  ];

  // List of predefined colors
  const themeColors = [
    { name: "Gray", value: "#6b7280" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Yellow", value: "#facc15" },
    { name: "Lime", value: "#84cc16" },
    { name: "Green", value: "#22c55e" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Sky", value: "#0ea5e9" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Violet", value: "#8b5cf6" },
    { name: "Fuchsia", value: "#d946ef" },
    { name: "Pink", value: "#ec4899" },
  ];

  // Handle color selection
  const handleColorSelect = (selectedColor: string, isCustom = false) => {
    setColor(selectedColor);
    setIsCustomColor(isCustom);
  };

  // Function to handle saving the book cover as an image
  const handleSave = () => {
    const element = document.getElementById("book-cover");
    if (element) {
      setIsLoading(true);
      html2canvas(element, {
        width: 500,
        height: 700,
        scale: 2, // Increase scale for higher resolution
        logging: true,
        scrollX: 0,
        scrollY: 0,
      })
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

  return (
    <div className="container mx-auto flex flex-col p-4 md:flex-row md:space-x-4">
      {/* Left Side: Controls */}
      <div className="w-full md:w-1/2">
        <h1 className="mb-4 text-2xl font-bold">ORLY Book Cover Generator</h1>
        <div className="space-y-2">
          {/* Top Text Input */}
          <div>
            <label className="block text-gray-700">Top Text:</label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Enter top text"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          {/* Title Input */}
          <div>
            <label className="block text-gray-700">Title:</label>
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
            <label className="block text-gray-700">Subtitle:</label>
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
            <label className="block text-gray-700">Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          {/* Guide Text Placement Selector */}
          <div>
            <label className="block text-gray-700">Guide Text Placement:</label>
            <select
              value={guideTextPlacement}
              onChange={(e) =>
                setGuideTextPlacement(
                  e.target.value as
                    | "top_left"
                    | "top_right"
                    | "bottom_left"
                    | "bottom_right",
                )
              }
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="top_left">Top Left</option>
              <option value="top_right">Top Right</option>
              <option value="bottom_left">Bottom Left</option>
              <option value="bottom_right">Bottom Right</option>
            </select>
          </div>
          {/* Color Selector */}
          <div>
            <label className="block text-gray-700">Color:</label>
            <div className="grid grid-cols-10 gap-2">
              {themeColors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => handleColorSelect(colorOption.value)}
                  style={{ backgroundColor: colorOption.value }}
                  className={`h-8 w-8 rounded ${
                    color === colorOption.value && !isCustomColor
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : ""
                  }`}
                ></button>
              ))}
              {/* Custom Color Button */}
              <button
                onClick={() => handleColorSelect(customColor, true)}
                className={`h-8 w-8 rounded border ${
                  isCustomColor ? "ring-2 ring-blue-500 ring-offset-2" : ""
                } flex items-center justify-center`}
              >
                <span className="text-sm">+</span>
              </button>
            </div>
            {/* Custom Color Picker */}
            {isCustomColor && (
              <div className="mt-2">
                <label className="block text-gray-700">Custom Color:</label>
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    setColor(e.target.value);
                  }}
                  className="h-10 w-full"
                />
              </div>
            )}
          </div>
          {/* Animal Image Selector */}
          <div>
            <label className="block text-gray-700">Animal Image:</label>
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
            className={`mt-8 w-full rounded-md py-2 font-semibold text-white ${
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
      <div className="mt-8 flex w-full items-start justify-center md:mt-0 md:w-1/2">
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            position: "relative",
            border: "1px solid #ccc",
          }}
        >
          <BookCover
            title={title}
            subtitle={subtitle}
            author={author}
            color={color}
            animalImage={animalImage}
            topText={topText}
            guideTextPlacement={guideTextPlacement}
          />
        </div>
      </div>
    </div>
  );
};

export default CoverEditor;
