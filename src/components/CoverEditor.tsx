import React, { useState } from "react";
import BookCover from "./BookCover";
import html2canvas from "html2canvas";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import {
  SquareArrowDownLeft,
  SquareArrowDownRight,
  SquareArrowUpLeft,
  SquareArrowUpRight,
} from "lucide-react";
import ItemsSelect from "~/components/ItemsSelect";
import { Button } from "~/components/ui/button";
import ColorPicker from "~/components/ColorPicker";

const CoverEditor = () => {
  // State variables
  const [topText, setTopText] = useState<string>(
    "Using funny cover to convince your colleagues",
  );
  const [title, setTitle] = useState<string>("Winning Arguments");
  const [subtitle, setSubtitle] = useState<string>("Pocket Reference");
  const [author, setAuthor] = useState<string>("@denitdao");
  const [subtitlePlacement, setSubtitlePlacement] = useState<
    "top_left" | "top_right" | "bottom_left" | "bottom_right"
  >("bottom_right");
  const [color, setColor] = useState<string>("#0a79b5");
  const [animalImage, setAnimalImage] = useState<string>("69.png");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // List of animal images
  const animalImages = [
    { label: "Bear", value: "1.png" },
    { label: "Cat", value: "2.png" },
    { label: "Wolf", value: "3.png" },
    { label: "Cow", value: "4.png" },
    { label: "Horse", value: "5.png" },
    { label: "Deer", value: "6.png" },
    { label: "Monkey", value: "7.png" },
    { label: "Wombat", value: "8.png" },
    { label: "Platypus", value: "9.png" },
    { label: "Bat", value: "10.png" },
    { label: "Crested Pelican", value: "11.png" },
    { label: "Shoebill", value: "12.png" },
    { label: "Charadrius", value: "13.png" },
    { label: "Corvus", value: "14.png" },
    { label: "Ostrich", value: "15.png" },
    { label: "Chameleon", value: "16.png" },
    { label: "Frog", value: "17.png" },
    { label: "Axolotl", value: "18.png" },
    { label: "Leopard Gecko", value: "19.png" },
    { label: "Rattle Snake", value: "20.png" },
    { label: "Sly Silurus", value: "21.png" },
    { label: "Strange Fish", value: "22.png" },
    { label: "Dory", value: "23.png" },
    { label: "Butterfly", value: "26.png" },
    { label: "Death Head Moth", value: "27.png" },

    { label: "Mushroom", value: "40.png" },
    { label: "Orangutan", value: "41.png" },
    { label: "Bornean Orangutan", value: "42.png" },
    { label: "AI Something", value: "43.png" },
    { label: "Goat", value: "69.png" },
    // TODO: Add more animals here
  ];

  // List of predefined colors
  const themeColors = [
    { name: "Gray", value: "#6b7280" },
    { name: "Red", value: "#ff0000" },
    { name: "Orange", value: "#e66a21" },
    { name: "Yellow", value: "#f8b824" },
    { name: "Lime", value: "#8c9d1a" },
    { name: "Green", value: "#449429" },
    { name: "Teal", value: "#3a9e9f" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Sky", value: "#0ea5e9" },
    { name: "Blue", value: "#103fa4" },
    { name: "Indigo", value: "#6167b3" },
    { name: "Violet", value: "#480d71" },
    { name: "Fuchsia", value: "#b8459c" },
  ];

  // Function to handle saving the book cover as an image
  const handleSave = () => {
    const element = document.getElementById("book-cover");
    if (element) {
      setIsLoading(true);
      html2canvas(element, {
        width: 500,
        height: 700,
        scale: 2,
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
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="w-full font-mono md:w-1/2">
        <h1 className="mb-8 font-sans text-3xl font-extrabold">
          O&apos;RLY Book Cover Generator
        </h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="top-text">Top Text:</Label>
            <Input
              type="text"
              id="top-text"
              placeholder="Enter top text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              id="title"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle:</Label>
            <Input
              type="text"
              id="subtitle"
              placeholder="Enter subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="author">Author:</Label>
            <Input
              type="text"
              id="author"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="guide-text-placement">Subtitle Placement:</Label>
            <ToggleGroup
              id="guide-text-placement"
              size={"sm"}
              type="single"
              value={subtitlePlacement}
              onValueChange={(value) =>
                setSubtitlePlacement(
                  value as
                    | "top_left"
                    | "top_right"
                    | "bottom_left"
                    | "bottom_right",
                )
              }
              className="justify-start"
            >
              <ToggleGroupItem value="bottom_left" aria-label="Bottom left">
                <SquareArrowDownLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="bottom_right" aria-label="Bottom right">
                <SquareArrowDownRight />
              </ToggleGroupItem>
              <ToggleGroupItem value="top_left" aria-label="Top left">
                <SquareArrowUpLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="top_right" aria-label="Top right">
                <SquareArrowUpRight />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div>
            <Label htmlFor="color">Color:</Label>
            <ColorPicker
              colors={themeColors.map((c) => c.value)}
              color={color}
              setColor={(color) => setColor(color)}
              className="block"
            />
          </div>
          <div>
            <Label htmlFor="animal-image">Animal Image:</Label>
            <ItemsSelect
              id="animal-image"
              value={animalImage}
              onValueChange={(value) => setAnimalImage(value)}
              items={animalImages}
              placeholder="Select an animal"
              label="Animal"
            />
          </div>
          <div className="pt-4">
            <Button
              onClick={handleSave}
              disabled={!title || !animalImage || isLoading}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Save Cover"}
            </Button>
          </div>
        </div>
      </div>

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
            topText={topText}
            title={title}
            subtitle={subtitle}
            author={author}
            color={color}
            animalImage={animalImage}
            subtitlePlacement={subtitlePlacement}
          />
        </div>
      </div>
    </div>
  );
};

export default CoverEditor;
