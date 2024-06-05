// components/Footer.js

import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 items-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-around flex-wrap gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            {/* <Image
              className="bg-transparent-image"
              src="/footer-logo.png"
              alt="Pizza Time"
              height={100}
              width={100}
            /> */}
            <p>Pizza Time</p>
            <p>New York, NY 10001</p>
            <p>Phone: 0321-6656859</p>
            <p>Email: info@pizzashop.com</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
            <p>Monday - Friday: 5:00 PM - 2:00 AM</p>
            <p>Saturday - Sunday: 5:00 PM - 3:00 AM</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-blue-600 transition-transform hover:scale-125"
              >
                <FaFacebookSquare className="text-4xl rounded-xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-transform hover:scale-125"
              >
                <FaTwitterSquare className="text-4xl rounded-xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500  transition-transform hover:scale-125"
              >
                <FaInstagramSquare className="text-4xl rounded-xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 transition-transform hover:scale-125"
              >
                <FaWhatsappSquare className="text-4xl rounded-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; Pizza Time. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
