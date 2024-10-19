import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollTrigger = () => {
  const ref = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [randomTransforms, setRandomTransforms] = useState([]);

  // Scroll progress from Framer Motion's useScroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Word "Hello" translations
  const helloTranslations = {
    en: 'Hello',
    hi: 'नमस्ते',  // Hindi
    es: 'Hola',    // Spanish
    fr: 'Bonjour', // French
    de: 'Hallo',   // German
    zh: '你好',    // Chinese
    ja: 'こんにちは', // Japanese
    ru: 'Здравствуйте', // Russian
    gu: 'હેલો', // Gujarati
    th: 'สวัสดี' // Thai
  };

  // Automatically cycle through translations
  useEffect(() => {
    const languages = Object.keys(helloTranslations);
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % languages.length;
      setCurrentLanguage(languages[index]);
    }, 1000); // Change translation every second

    return () => clearInterval(intervalId); 
  }, []);

  // Generate random transforms once when the component is first mounted
  useEffect(() => {
    const generateRandomTransforms = () => {
      return Array.from({ length: text.length }).map(() => ({
        translateX: Math.random() * 400 - 200,
        translateY: Math.random() * 400 - 200,
        rotate: Math.random() * 360 - 180,
      }));
    };

    setRandomTransforms(generateRandomTransforms());
  }, []);

  // Sample text
  const text = '"Every word is a step towards creativity, and every shared idea transforms drafts into masterpieces. Together, we write the future."';
  const letters = text.split('');

  // Framer Motion global transforms for opacity
  const opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section className=''>
      {/* Continuously animating "Hello" with translations */}
      <h1 className="md:text-[1.5rem] lg:text-[2.5rem] text-[2rem] text-blue-700 md:mx-10 mx-5 md:mt-0 mt-10">
        {helloTranslations[currentLanguage]},
      </h1>

      {/* Scroll-triggered text animation */}
      <div ref={ref} className="md:h-[150vh] h-[20vh] lg:mt-0 md:-mt-40 flex justify-center items-center">
        <motion.div className="flex flex-wrap sm:max-w-[300px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-full mx-40 justify-center">
          {letters.map((letter, index) => {
            const { translateX, translateY, rotate } = randomTransforms[index] || {};

            // Use a single set of transforms for each letter based on scroll position
            const xTransform = useTransform(scrollYProgress, [0, 0.5, 1], [translateX, 0, 0]);
            const yTransform = useTransform(scrollYProgress, [0, 0.5, 1], [translateY, 0, 0]);
            const rotateTransform = useTransform(scrollYProgress, [0, 0.5, 1], [rotate, 0, 0]);

            return (
              <motion.span
                key={index}
                style={{
                  opacity,
                  translateX: xTransform,
                  translateY: yTransform,
                  rotate: rotateTransform,
                  display: 'inline-block',
                }}
                className="lg:text-[1.2rem] md:text-md text-sm font-black text-blue-400"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollTrigger;
