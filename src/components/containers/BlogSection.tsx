import { useCallback, useRef, useState, useEffect } from "react";
import {
  Swiper as SwiperComponent,
  SwiperRef,
  SwiperSlide,
} from "swiper/react";
import { Blog } from "../elements";
import { Spinner } from "../utils";

interface BlogSectionProps {
  posts: {
    title: string;
    date: string;
    thumb: string;
    category: string[];
    slug: string;
  }[];
}

const BlogSection = ({ posts }: BlogSectionProps) => {
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef<SwiperRef>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (!mounted)
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );
  if (!posts) return null;

  return (
    <div className="swiper-holder">
      <SwiperComponent
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{
          delay: 5000,
        }}
        centerInsufficientSlides={true}
        ref={sliderRef}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {posts &&
          posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div className="slider-item">
                <Blog post={post} />
              </div>
            </SwiperSlide>
          ))}
      </SwiperComponent>
      <button className="swiper-button-prev" onClick={handlePrev}></button>
      <button className="swiper-button-next" onClick={handleNext}></button>
    </div>
  );
};

export default BlogSection;
