interface BlurbCtaSectionProps {
    handleClickCtaButton: () => void;
  }

const BlurbCtaSection = ({handleClickCtaButton}: BlurbCtaSectionProps) => {
  return (
    <>
    <div className="bg-light-pink bg-opacity-80 px-4 py-5 text-marine-blue font-Mali text-center text-sm rounded-b-[70%_30%] shadow-[0px_10px_20px_rgba(32,94,118,0.2)] ">
      <p className="font-medium md:p-4 lg:px-8 md:text-lg lg:text-2xl xl:3xl">Planning a trip with your toddler? We offer solutions to make your journey smooth and enjoyable. Explore travel destinations, create your perfect packlist and track your family travel milestones.</p>
      <button type="button" onClick={handleClickCtaButton} className="mt-3 px-2 py-2 text-sm md:text-xl lg:text-2xl xl:text-3xl lg:mt-4 bg-blue-water  text-white rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors">
            Join us!
          </button>
    </div>
    </>
  )
}

export default BlurbCtaSection