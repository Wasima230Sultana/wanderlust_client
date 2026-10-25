
import Banner from "@/components/Banner";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";


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
