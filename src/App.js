import React from 'react';

import Header from "./components/Header";
import HeroSlider from './components/HeroSlider';
import Accordion from './components/Accordion';
import EbookList from './components/EbookList';
import PopularEbooks from './components/PopularEbooks';
import TrendingEbooks from './components/TrendingEbooks';
import SubjectSlider from './components/SubjectSlider';
import AppsSection from './components/AppsSection';
import DigitalAudioSection from  './components/DigitalAudioSection';
import PoetrySection from './components/PoetrySection';
import NewsletterForm from './components/NewsletterForm';
import Footer from './components/Footer';
const genreItems = [
  {
    title: 'Science Fiction',
    description: 'Explore the best in science fiction literature.',
    image: 'path_to_image.jpg', // Update with appropriate image
  },
  {
    title: 'Fantasy',
    description: 'Dive into magical worlds and epic adventures.',
    image: 'path_to_image.jpg',
  },
  // Add more genres as needed
];

const App = () => {
  return (
    <div>

      <Header />
      <HeroSlider/>
    
      <EbookList />
    <TrendingEbooks />
      <PopularEbooks />
 <SubjectSlider />

    <AppsSection />
    
    <DigitalAudioSection />
   <Accordion items={genreItems} />
   <PoetrySection />
   <NewsletterForm />
   <Footer />
   
    </div>
  );
};

export default App;
