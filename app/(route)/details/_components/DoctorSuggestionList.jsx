"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function DoctorSuggestionList() {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((resp) => {
      // console.log('DoctorSuggestionList',resp);
      console.log("DoctorSuggestionList", resp.data.data);
      setDoctorList(resp.data.data);
    });
  };
  return (
    <div className="p-4 border-[1px] mt-5 md:ml-5 rounded-lg">
      <h2 className="font-bold mb-3">Suggestions</h2>
      {doctorList.map((doctor, index) => (
        <Link
          key={index}
          href={`/details/${doctor.documentId}`}
          className=" mb-4 p-3 shadow-sm w-full 
            cursor-pointer hover:bg-slate-100
            rounded-lg flex items-center gap-3"
        >
          <Image
            src={doctor.Image[0]?.url}
            alt={doctor.Name}
            width={70}
            height={70}
            className="w-[70px] h-[70px] rounded-full object-fit"
          />
          <div className="mt-3 flex-col flex gap-1 items-baseline">
            <h2
              className="text-[10px] bg-blue-100 p-1 rounded-full px-2
                     text-primary"
            >
              {doctor.Name}
            </h2>
            <h2 className="font-medium text-sm">{doctor.Name}</h2>
            <h2 className="text-primary text-xs flex gap-2">
              {/* <GraduationCap/> */}
              <span>
                {doctor.Year_Of_Experience}
                {""} {doctor.Year_Of_Experience > 1 ? "years" : "year"}
              </span>
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DoctorSuggestionList;
