import { heroImages } from "./_components/hero-images";
import { Cta } from "./_components/cta";
import { Features } from "./_components/features";
import { HeroParallax } from "./_components/hero-parallax";

const RootPage = () => {
  return (
    <div className="flex flex-col gap-12">
      <HeroParallax products={heroImages} />
      <section id="features">
        <Features />
      </section>
      <Cta />
    </div>
  );
};

export default RootPage;
