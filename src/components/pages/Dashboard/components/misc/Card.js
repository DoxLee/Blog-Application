import React from "react";

const Card = ({ title, icon, value }) => {
  return (
    <div className=" bg-white py-8 rounded-md shadow-md">
      <div className="flex items-center justify-center">
        <div>
          <div className="text-lg text-gray-500 font-medium text-center">
            {title}
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center h-full">
              <span className="pr-2 mt-1">{icon} </span>
              <span className="font-semibold text-2xl font-sans text-center">
                {value}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
