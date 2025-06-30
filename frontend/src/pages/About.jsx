import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In itaque
            modi ducimus hic. Id, fugit temporibus? Quas reiciendis consequuntur
            amet? Distinctio, modi consectetur! Rerum reprehenderit facilis cum
            libero quae et inventore fugit possimus similique eius consequuntur
            necessitatibus est doloremque expedita ex deserunt, accusantium iure
            veniam?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            iusto quaerat quae corrupti optio aliquam eaque labore fugit quo
            dolorum sint totam quasi id impedit tempora qui, sunt quod explicabo
            soluta fugiat rem eos, incidunt minus! Fugit voluptatibus, ipsam
            deserunt explicabo placeat a. Asperiores, consectetur.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo culpa
            ut veniam. Excepturi cumque error dicta voluptates amet odit rerum
            dolorem ducimus beatae! Accusantium sunt itaque totam magni mollitia
            quisquam corporis quos earum perferendis?
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius voluptas provident molestias asperiores! Saepe, maxime.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius voluptas provident molestias asperiores! Saepe, maxime.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;
