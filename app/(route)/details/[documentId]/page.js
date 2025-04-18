"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { use, useEffect, useState } from "react";
import DoctorDetail from "../_components/DoctorDetail";
import DoctorSuggestionList from "../_components/DoctorSuggestionList";

function Details({ params }) {
  const [doctor, setDoctor] = useState();
  const unwrappedParams = use(params);
  console.log("params:", unwrappedParams);
  // const Id = unwrappedParams.id;
  const doctorId = unwrappedParams.documentId;
  console.log(doctorId); // Properly unwrapping the params Promise

  useEffect(() => {
    getDoctorById();
  }, []);

  const getDoctorById = () => {
    GlobalApi.getDoctorById(doctorId).then((resp) => {
      console.log("getdoctorbydoctorId1", resp);
      console.log("getdoctorbydoctorId2", resp.data.data);
      setDoctor(resp.data.data);
    });
  };

  return (
    <div className="p-5 md:px-10">
      <div className="font-bold text-[22px] ">Details</div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Doctor Detail,, component will be here */}

        <div className=" col-span-3">
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>

        {/* Doctor Suggestion, component will be here  */}
        <div>
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  );
}

export default Details;
