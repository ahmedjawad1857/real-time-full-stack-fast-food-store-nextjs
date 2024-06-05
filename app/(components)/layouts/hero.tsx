import Image from "next/image";
import Right from "../icons/right";
const Hero = () => {
  return (
    <>
      <section className="hero mt-4">
        <div className="py-12">
          <h1 className="text-4xl font-semibold leading-10">
            Everything <br />
            is better <br />
            with a &nbsp;
            <span className="text-primary ">Pizza</span>
          </h1>
          <p className="my-6 text-grey-500">
            Pizza is the missing piece that makes every <br />
            day complete, a simple yet delicioes joy in life.
          </p>
          <div className="flex gap-4 text-sm">
            <button className="bg-primary uppercase hover:bg-orange-200 hover:text-primary transition-transform hover:scale-110 text-white px-4 py-2 rounded-full flex gap-2 items-center border-0">
              Order Now <Right />
            </button>
            <button className="flex border-0 items-center gap-2 py-2 text-grey-600 font-semibold hover:text-primary transition-transform hover:scale-110">
              Learn More... <Right />
            </button>
          </div>
        </div>

        <div className="relative">
          <Image
            src="/pizza.png"
            alt="Pizza Image"
            layout={"fill"}
            objectFit={"contain"}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
