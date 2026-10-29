
import Banner from "@/components/home/Banner";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      <Banner />
      <WhyChoose />
      <Testimonials />
      <CtaBanner />

    </div>
  );
}
