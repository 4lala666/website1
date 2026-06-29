import React from 'react';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import Stats from '../Stats/Stats';
import Advantages from '../Advantages/Advantages';
import Catalog from '../Catalog/Catalog';
import Gallery from '../Gallery/Gallery';
import HowWeWork from '../HowWeWork/HowWeWork';
import Reviews from '../Reviews/Reviews';
import ContactForm from '../ContactForm/ContactForm';
import Footer from '../Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Advantages />
        <Catalog />
        <Gallery />
        <HowWeWork />
        <Reviews />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
