"use client"
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

interface Props {
    title: string;
    description: string;
    seconddesciption: string;
    children: React.ReactNode;
    isChecked:boolean
}

export default function PremiumCards({ description, title, seconddesciption, children ,isChecked}: Props) {
    // Ensuring both splits happen only when description and seconddesciption are available
    const [price, period] = description ? description.split("/") : ["", ""];
    const [firstdescription, restdesciption] = seconddesciption ? seconddesciption.split("/") : ["", ""];

    return (
        <Card className='px-6 min-h-[30rem] py-8 text-left bg-black/70 border-gray-800 shadow-lg shadow-gray-900'>
            <CardTitle className='font-normal text-gray-200 text-left text-2xl flex items-center justify-between'>
                {title}
                <Checkbox 
                checked={isChecked}
                className={`md:h-5 md:w-5 md:block  hidden data-[state=checked]:bg-blue-400`}/>
            </CardTitle>
            <CardDescription className='mt-4 text-left font-bold text-4xl text-gray-200'>
                <span className="text-5xl">{price.trim()}</span>{' '}
                <span className="text-xl font-light text-gray-400">/ {period.trim()}</span>
            </CardDescription>
            <div className='text-xl mt-2 flex items-center gap-4 font-light text-left'>
                
                <h1 className='text-gray-400'>{firstdescription}{" "}</h1>
                <div className='text-sm p-1 uppercase text-[#fff] rounded-xl px-2 bg-green-600/55 whitespace-nowrap'>{restdesciption}</div>
            </div>
            <CardContent className='p-0'>
                {children}
            </CardContent>
        </Card>
    );
}
