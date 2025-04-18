"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

function DoctorList({ heading = "Popular Doctors" }) {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList()
      .then((resp) => {
        console.log("documentidcheck", resp);
        // console.log(resp.data.data);
        setDoctorList(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor list:", error);
      });
  };

  return (
    <div className="mb-10 px-8">
      <div className="flex justify-start max-w-[1200px] mx-auto px-4">
  <h2 className="text-xl font-bold">{heading}</h2>
</div>

      {/* Render doctor list here */}

      <div
        className="grid grid-cols-2 
        sm:grid-cols-2 md:grid-cols-3
        gap-7 mt-4
         lg:grid-cols-4 max-w-[1200px] mx-auto"
      >
        {
          doctorList.length > 0
            ? doctorList.map((doctor, index) => (
                <div
                  className="border-[1px] rounded-lg p-3
                cursor-pointer hover:border-primary
                hover:shadow-sm transition-all ease-in-out"
                  key={index}
                >
                  
  <Image
    src={doctor.Image[0].url}
    alt="doctor"
    width={500}
    height={200}
    className=" h-[200px] w-[500px] object-cover rounded-lg "
  />

                  <div className="mt-3 items-baseline flex flex-col gap-1">
                    <h2
                      className="text-[10px] bg-blue-100 p-1 rounded-full
                        px-2 text-primary"
                    >
                      {doctor.Name}
                    </h2>
                  </div>

                  <h2 className="text-primary text-sm">
                    {doctor.Year_Of_Experience}
                  </h2>
                  <h2 className="text-gray-500 text-sm">{doctor.Address}</h2>
                  <Link href={"/details/" + doctor?.documentId}>
                    <h2
                      className="p-2 px-3 border-[1px] border-primary
                        text-primary rounded-full w-full text-center
                        text-[11px] mt-2
                        cursor-pointer 
                        hover:bg-primary hover:text-white"
                    >
                      Book Now
                    </h2>
                  </Link>
                </div>
              ))
            : // Skelton Effect
              [1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="h-[220px] bg-slate-200 
            w-full rounded-lg animate-pulse"
                ></div>
              ))

          //<p>No doctors available</p>
        }
      </div>
    </div>
  );
}

export default DoctorList;
