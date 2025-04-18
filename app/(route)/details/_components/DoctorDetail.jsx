"use client";
import React from "react";
import Image from "next/image";
import { GraduationCap, Import, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookAppointment from "./BookAppointment";

function DoctorDetail({ doctor }) {
  const socialMediaList = [
    {
      id: 1,
      icon: "/youtube.png",
      url: "",
    },
    {
      id: 2,
      icon: "/linkedin.png",
      url: "",
    },
    {
      id: 3,
      icon: "/twitter.png",
      url: "",
    },
    {
      id: 4,
      icon: "/facebook.png",
      url: "",
    },
  ];

  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
        <div>
          {/* Doc img */}
          <Image
            src={doctor.Image?.url}
            alt="doctor"
            width={200}
            height={200}
            className="h-[200px] w-full object-cover rounded-lg"
          />
        </div>
        {/* doc info */}
        <div className="col-span-2 mt-5 md:px-10 flex flex-col gap-3 items-baseline">
          <h2 className="font-bold text-2xl">{doctor?.Name}</h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <GraduationCap />
            <span>{doctor?.Year_Of_Experience} of Experience</span>
          </h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <MapPin />
            {doctor?.Address}
          </h2>
          <h2 className="text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary">
            Category Name
          </h2>
          <div className="flex gap-3">
            {socialMediaList.map((item, index) => (
              <Image
                key={index}
                src={item.icon}
                alt=""
                width={30}
                height={30}
              />
            ))}
          </div>

          <BookAppointment doctor={doctor} />
        </div>
      </div>
      <div className="p-3 border-[1px] rounded-lg mt-5">
        <h2 className="font-bold text-[20px]">About Me</h2>
        <p className="text-gray-500 tracking-wider mt-2">{doctor?.About}</p>
      </div>
    </>
  );
}

export default DoctorDetail;
