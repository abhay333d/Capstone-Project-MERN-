import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Glimmer was born from a love for timeless elegance and a vision to redefine the jewelry shopping experience. Our journey began with a simple belief: every piece of jewelry should tell a story and bring a touch of sparkle to life’s special moments.</p>
              <p>Since our inception, we’ve dedicated ourselves to curating a stunning collection of fine jewelry, crafted with precision and passion. From classic designs to modern statement pieces, Glimmer offers a carefully chosen selection sourced from trusted artisans and renowned designers, ensuring beauty, quality, and sophistication for every occasion.</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>Our mission at Glimmer is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
<p className='text-gray-600'>Each Glimmer piece is thoughtfully designed and expertly crafted, ensuring it meets our highest standards of quality and elegance.</p>          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
<p className='text-gray-600'>With an intuitive browsing experience and a seamless ordering process, finding the perfect piece of jewelry has never been easier.</p>          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
<p className='text-gray-600'>
  Our team of jewelry experts is here to guide you at every step, making your sparkle and satisfaction our top priorities.</p>          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
