import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="w-9/12 mx-auto">
          <img src="404-not-found.svg" />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-marine-blue text-mustard px-4 md:px-5 py-2 text-center text-base md:text-lg rounded-lg font-medium hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue mb-10 lg:mb-14 font-Mali"
            onClick={handleGoToHome}
          >
            Go Home
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
