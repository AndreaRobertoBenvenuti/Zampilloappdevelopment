import imgBasemapImage from "figma:asset/aa3894456ae07607cc5257afcdbe2ccd7daa9e83.png";

export default function Figmap() {
  return (
    <div className="relative size-full" data-name="Figmap">
      <div className="absolute h-[600px] left-0 top-0 w-[800px]" data-name="Basemap image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgBasemapImage} />
      </div>
    </div>
  );
}