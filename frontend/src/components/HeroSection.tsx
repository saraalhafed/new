interface HeroSectionProps {
  handleClick: () => void;
}
const HeroSection = ({handleClick}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-1/3 flex items-center justify-center overflow-hidden">
      <picture>
        <source media="(min-width:768px)" srcSet="hero-background-m.jpg"/>
        <img
          src="hero-background-s.jpg"
          alt="Childrend playing - Hero background"
          className="w-full h-auto object-contain"
        />
      </picture>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute font-Mali">
        <div className="relative h-full flex flex-col items-center justify-center text-white">
        <h2 className="text-xl md:text-4xl lg:text-6xl xl:text-7xl mb-2 md:mb-8 font-semibold drop-shadow-lg">Let's explore</h2>
          <h2 className="text-xl md:text-4xl lg:text-6xl xl:text-7xl mb-2 md:mb-8 font-semibold drop-shadow-lg">the world with</h2>
          <h1 className="text-2xl md:text-5xl lg:text-7xl xl:text-8xl mb-2 md:mb-8 font-bold drop-shadow-lg">
            Toddlers on the Road
          </h1>
          <button type="button" onClick={handleClick} className="px-2 py-2 text-sm md:text-xl lg:text-2xl xl:text-3xl lg:mt-4 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors">
            Find out more
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
