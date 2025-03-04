import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { BsFillTelephoneFill } from "react-icons/bs";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen bg-beige bg-opacity-50">
      <Header />
      <main className="flex-1 max-auto">{children}</main>
      <footer className="bg-beige bg-opacity-100 text-marine-blue font-Mali">
        <div className="container mx-auto grid grid-cols-12 text-xs gap-5 p-3.5 ms-8 md:text-m lg:m-auto lg:px-4">
          <div className="grid col-span-full md:col-span-9 md:pl-8 lg:col-span-4 lg:pl-5 lg:m-auto">
              <div>
                  <div className="text-s font-semibold underline underline-offset-8 py-2 md:text-l">
                    <p>CONTACT</p>
                  </div>
                  <div className="grid grid-cols-1 gap-1 md:col-span-1 md:text-m">
                    <div className="flex items-center justify-start gap-2 pt-2">
                      <span><MdEmail /></span> 
                      <p>toddlersontheroad@gmail.com</p>
                    </div>
                    <div className="flex items-center justify-start gap-2 pt-2">
                      <span><BsFillTelephoneFill /></span>
                      <p >0178234634</p>
                    </div>
                    <div className="flex items-center justify-start gap-2 pt-2">
                      <span><ImLocation2 /></span>
                      <p>Königstr 8, 28491 Hanover</p>
                    </div>
                 </div>
            </div>
          </div>
          <div className="grid col-span-full  md:col-span-3 md:pr-3 lg:col-span-4 lg:pl-5 lg:m-auto lg:pt-3">
            <div className="text-s font-semibold underline underline-offset-8 py-2 md:text-l lg:pb-3">
               <p>PAGES</p>
            </div>
            <div className="grid grid-cols-1 gap-0.5">
               <Link to="/about" className=" px-1 pt-1.5">
                About
               </Link>
               <Link to="/contact" className="px-1 pt-1.5">
                Contact
               </Link>
               <Link to="/register" className="px-1 pt-1.5">
                Register
               </Link>
               <Link to="/login" className="px-1 pt-1.5">
                Login
               </Link>
            </div>
          </div>
          <div className="grid col-span-full md:pl-8 lg:col-span-4 lg:pl-5 lg:m-auto lg:py-1">
            <div className="text-s font-semibold underline underline-offset-8 py-2 md:text-l lg:pb-4">
              <p>FOLLOW US</p>
            </div>
            <div className="flex items-center justify-start gap-3 pt-2 lg:pb-12">
               <Link to="/">
                <FaInstagram />
               </Link>
               <Link to="/">
                <FaFacebook />
               </Link>
               <Link to="/">
                <IoLogoGithub />
               </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end px-7 mb-3 md:px-10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <BsArrowUpCircleFill className="text-2xl lg:text-4xl" />
        </div>
        <div className="text-center text-xs space-x-6">
            <p className="text-s text-center mb-1">
              &copy; 2025 - Toddlers on the Road
            </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
