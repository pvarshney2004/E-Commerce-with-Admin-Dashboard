import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-2 mt-40 text-sm">
        <div>
          <img className="w-32 mb-5" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Reprehenderit magni voluptatibus voluptate, ut quos iste cumque a
            repellat quia quas distinctio!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>PRIVACY POLICY</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9996663330</li>
            <li>prashantvarshney4321@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ prashant.com - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
