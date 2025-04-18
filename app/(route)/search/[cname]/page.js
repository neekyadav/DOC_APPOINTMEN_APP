"use client";
import React, { use, useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import DoctorList from "@/app/_components/DoctorList";

function Search({ params }) {
  const [doctorList, setDoctorList] = useState();
  const unwarappedParam = use(params); // Properly unwrapping the params Promise

  useEffect(() => {
    console.log(unwarappedParam.cname); //Access after unwrapping
    getDoctors();
  }, []);

  const getDoctors = () => {
    GlobalApi.getDoctorByCategory(unwarappedParam.cname).then((resp) => {
      // console.log(resp);
      setDoctorList(resp.data.data);
    });
  };
  return (
    <div className="mt-10">
      {/* <CategoryList/> */}
      <DoctorList heading={unwarappedParam.cname} />
    </div>
  );
}

export default Search;
