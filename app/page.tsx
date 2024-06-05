import Hero from "./(components)/layouts/hero";
import HomeMenu from "./(components)/layouts/homeMenu";
import SectionHeaders from "./(components)/layouts/sectionHeaders";
import Link from "next/link";
const Home = () => {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 ">
        <SectionHeaders subHeader="Our Story" mainHeader="About Us" />
        <div className="max-w-2xl mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            nobis saepe asperiores minima incidunt nostrum in dolor, fugiat
            mollitia inventore, dolorem optio perspiciatis magni nam. Deleniti
            nesciunt itaque quae perspiciatis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            nobis saepe asperiores minima incidunt nostrum in dolor, fugiat
            mollitia inventore, dolorem optio perspiciatis magni nam. Deleniti
            nesciunt itaque quae perspiciatis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
            nobis saepe asperiores minima incidunt nostrum in dolor, fugiat
            mollitia inventore, dolorem optio perspiciatis magni nam. Deleniti
            nesciunt itaque quae perspiciatis!
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders subHeader="Don't Hesitate" mainHeader="Contact Us" />
        <div className="mt-8">
          <Link
            className="text-4xl underline text-gray-500"
            href="tel:+923216656859"
          >
            +92 321 6656859
          </Link>
          {/* <h1 className="text-xl">Our Email:</h1>
          <Link
            className="text-4xl underline text-gray-500"
            href="tel:+923216656859"
          >
            ahmedjawad1857@gmail.com
          </Link> */}
        </div>
      </section>
    </>
  );
};

export default Home;
