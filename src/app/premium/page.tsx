"use client"
import React, { useState } from 'react';
import PremiumCards from './Card';
import { Check } from 'lucide-react';

const footerContent = {
  Basic: {
    title: "Basic",
    price: "32$ / year",
    subtitle: "Billed Annually",
  },
  Premium: {
    title: "Premium",
    price: "84$ / year",
    subtitle: "Billed Annually",
  },
  PremiumPlus: {
    title: "Premium +",
    price: "168$ / year",
    subtitle: "Billed Annually",
  },
};



const billingDescriptions = [
  "Small reply boost",
  "Encrypted direct messages",
  "Bookmark folders",
  "Highlights tab",
  "Edit post",
  "Post longer videos",
  "Longer posts",
];

const SecondbillingDescriptions = [
  "Half Ads in For You and Following",
  "Larger reply boost",
  "Get paid to post",
  "Checkmark",
  "Grok 2 AI Assistant",
  "X Pro, Analytics, Media Studio",
  "Creator Subscriptions",
];

const ThirdbillingDescriptions = [
  "Fully ad-free",
  "Largest reply boost",
  "Write Articles",
  "Radar",
];
type cards = "Basic" | "Premium" | "PremiumPlus" 
import { TableComponent } from './TableComponent';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export default function Page() {
  const [premiumcards, setpremiumcards] = useState<cards>("Basic")
  const selectedFooter = footerContent[premiumcards]
  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-black">
      {/* Subtle gradient background */}
      <div
        className="absolute top-0 left-0 w-full h-[100dvh]"
        style={{
          background: `radial-gradient(circle at top, rgba(0, 122, 255, 0.2) 0%, rgba(0, 0, 0, 0.9) 40%)`,
        }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-[100vh] "
        style={{
          background: `radial-gradient(circle at bottom, rgba(0, 122, 255, 0.2) 0%, rgba(0, 0, 0, 0.9) 60%)`,
        }}
      ></div>


      {/* Content */}
      <div className="relative mx-auto max-w-[90rem]  px-6 lg:px-0 flex flex-col gap-6 text-center items-center z-10 mt-12">
        <h1 className="text-3xl lg:text-5xl font-semibold text-white">Upgrade to Premium</h1>
        <p className="text-gray-300 -mt-4 ">
          Enjoy an enhanced experience, exclusive creator tools, top-tier verification, and security.
        </p>
        <p className="text-gray-400">(For organizations, sign up here)</p>

        {/* Card section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center mt-6">
          <div
            onClick={() => setpremiumcards("Basic")}
            className={cn(`cursor-pointer  transition-shadow duration-300 ease-in-out ${premiumcards === "Basic" && "md:shadow-[0_0_0_4px] md:shadow-blue-400 md:rounded-xl"}`)}>
            <PremiumCards   isChecked={premiumcards === "Basic"} title="Basic" seconddesciption="$32 billed annually / save 11%" description="$2.67/month">
            <Button className='bg-[#fff] md:hidden hover:bg-gray-200 font-medium ease-in duration-200 transition-colors py-2 w-full mt-4 rounded-full'>Subscribe</Button>
              <div className="mt-4">
                {billingDescriptions.map((desc, i) => (
                  <div key={i} className="flex mt-[0.2rem] items-center text-left text-lg gap-2 font-normal text-gray-200">
                    <Check size={18} />
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </PremiumCards>
          </div>

          <div
            onClick={() => setpremiumcards("Premium")}
            className={cn(`cursor-pointer transition-shadow duration-300 ease-in-out ${premiumcards === "Premium" && "md:shadow-[0_0_0_4px] md:shadow-blue-400 md:rounded-xl"}`)}>

            <PremiumCards 
            isChecked={premiumcards ==="Premium"}
            title="Premium" seconddesciption="$84 billed annually / save 12%" description="$7/month">
              <Button className='bg-[#fff] md:hidden hover:bg-gray-200 ease-in duration-200 transition-colors py-2 font-medium w-full mt-4 rounded-full'>Subscribe</Button>
              <div className="mt-4">
                <h2 className="font-semibold text-gray-200 text-lg">Everything in Basic, and</h2>
                {SecondbillingDescriptions.map((desc, i) => (
                  <div key={i} className="flex mt-[0.2rem] items-center text-left text-[1.1rem] gap-2 font-normal text-gray-200">
                    <Check size={18} />
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </PremiumCards>
          </div>

          <div
            onClick={() => setpremiumcards("PremiumPlus")}
            className={cn(`cursor-pointer transition-shadow duration-300 ease-in-out ${premiumcards === "PremiumPlus" && "md:shadow-[0_0_0_4px] md:shadow-blue-400 md:rounded-xl"}`)}>

            <PremiumCards 
             isChecked={premiumcards === "PremiumPlus"}
            title="Premium +" seconddesciption="$168 billed annually / save 12%" description="$14/month">
              <Button className='bg-[#fff]  md:hidden hover:bg-gray-200 ease-in duration-200 transition-colors py-2 font-medium w-full mt-4 rounded-full'>Subscribe</Button>
              <div className="mt-4">
                <h2 className="font-semibold text-gray-200 text-lg">Everything in Premium, and</h2>
                {ThirdbillingDescriptions.map((desc, i) => (
                  <div key={i} className="flex mt-[0.2rem] items-center text-left text-lg gap-2 font-normal text-gray-200">
                    <Check size={18} />
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </PremiumCards>
          </div>

        </div>

        {/* Second component */}
        <div className='mt-28 min-h-screen flex flex-col items-center text-left w-full  mb-[50vh]'>
          <h1 className='lg:text-4xl font-semibold text-gray-50 text-3xl '>Compare tiers & features</h1>
          <TableComponent />
        </div>
      </div>




      {/* Footer */}
      <div className="hidden fixed md:bottom-0 md:z-20  md:h-72 lg:h-48 border-t md:flex  md:justify-center md:items-center border-gray-900 bg-black/95 w-full">
        
        <div className='flex  md:gap-6 mx-auto max-w-6xl lg:w-1/2 md:w-[70%]'>
          <div className="flex flex-col  h-full w-full gap-1">
            <h1 className="text-white  text-xl font-normal">{selectedFooter.title}</h1>
            <span className="text-3xl  font-semibold ">{selectedFooter.price}</span>
            <p className="text-gray-400">{selectedFooter.subtitle}</p>
          </div>
          <div className='flex flex-col gap-4'>
            <Button className='bg-button hover:bg-blue-600 ease-in duration-200 transition-colors rounded-full text-gray-50 px-12'>
              Subscribe & Pay
            </Button>
            <div 
            style={{lineHeight:"110%"}}
            className='p-2 border rounded-xl  border-gray-600 text-sm text-gray-200 font-normal '>
              <span>
                By subscribing, you agree to our Purchaser <p className='font-semibold inline-block text-blue-600'>Terms of Service.</p> Subscriptions auto-renew until canceled. Cancel anytime,  at least 24 hours prior to renewal to avoid additional charges. Manage your subscription through the platform you subscribed on.
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
