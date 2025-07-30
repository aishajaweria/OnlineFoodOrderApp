import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
          Welcome to BiteBliss, your go-to food ordering app for delicious pizzas, burgers, and shakes delivered right to your doorstep. At BiteBliss, we believe in bringing joy through food, offering a wide range of mouthwatering options to satisfy your cravings anytime, anywhere.
          </p>
          <p>Our commitment to quality means every bite is crafted with the freshest ingredients, ensuring an unforgettable taste experience. Whether you're in the mood for a classic pepperoni pizza, a juicy burger, or a creamy shake, BiteBliss has you covered.</p>
          <p>With easy ordering and fast delivery, enjoying your favorite meals has never been more convenient. Join our community of happy customers and discover the bliss in every bite. BiteBliss – where great food meets great moments.</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +92 3303856444
          </a>
        </div>
      </section>
    </>
  )
}
