import React from "react";

const Card = ({ title, icon, value }) => {
  return (
    <div className="py-8 bg-white rounded-md shadow-md ">
      <div className="flex items-center justify-center">
        <div>
          <div className="text-lg font-medium text-center text-gray-500">
            {title}
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center h-full">
              <span className="pr-2 mt-1">{icon} </span>
              <span className="font-sans text-2xl font-semibold text-center">
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
