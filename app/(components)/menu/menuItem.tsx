import React from "react";

const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center  hover:bg-white transition-all hover:shadow-2xl hover:shadow-black/25">
      <div className="text-center">
        <img
          className="max-h-36 max-w-auto block mx-auto"
          src="/pizza.png"
          alt="pizza"
        />
      </div>
      <h4 className="font-semibold my-3 text-xl">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
      <button className="mt-4 bg-primary text-white px-6 py-2 rounded-full ">
        Add to Cart $12
      </button>
    </div>
  );
};

export default MenuItem;
