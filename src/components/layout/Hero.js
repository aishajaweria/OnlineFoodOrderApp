import Right from "@/components/icons/Right";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          Everything<br />
          is better<br />
          with a&nbsp;
          <span className="text-primary">
            Pizza , Burgers and Shakes
          </span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
        Pizza , Burgers and shake is the missing piece that makes every day complete, a scrumptious joy that adds a cheeky smile to life!
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex justify-center bg-primary uppercase  items-center gap-2 text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image src="/pizzaaa.jpeg"
          alt="pizza"
          fill
          style={{ objectFit: 'contain' }}
          priority />
      </div>
    </section>
  );
}