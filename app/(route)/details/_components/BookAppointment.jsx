"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect } from "react";
import { Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };
  const isPastDay = (day) => {
    return day <= new Date();
  };

  const saveBooking = () => {
    const data = {
      data: {
        userName: user.given_name + " " + user.family_name,
        Email: user.email,
        Time: selectedTimeSlot,
        Date: date,
        doctors: doctor.documentId,
        Note: note,
      },
    };
    // console.log(data)
    GlobalApi.bookAppointment(data).then((resp) => {
      console.log(resp);
      if (resp) {
        GlobalApi.sendEmail(data).then((resp) => {
          console.log(resp);
        });
        toast("Appointment Booked Successfully");
      }
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button className="mt-3 rounded-full">Book Appointment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                  {/* Calnder */}
                  <div className="flex gap-3 flex-col items-baseline">
                    <h2 className="flex gap-2 items-center">
                      <CalendarDays className="text-primary h-5 w-5" />
                      Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      disabled={isPastDay}
                    />
                  </div>
                  {/* Time slot */}

                  <div className=" mt-3 md:mt-0">
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      Select Time Slot
                    </h2>
                    <div
                      className="grid grid-cols-3 gap-2 border 
                        rounded-lg p-5"
                    >
                      {timeSlot?.map((item, index) => (
                        <h2
                          key={index}
                          onClick={() => setSelectedTimeSlot(item.time)}
                          className={`p-2 border cursor-pointer
                            text-center hover:bg-primary hover:text-white
                            rounded-full
                            ${
                              item.time == selectedTimeSlot &&
                              "bg-primary text-white"
                            }`}
                        >
                          {item.time}
                        </h2>
                      ))}
                    </div>
                  </div>
                </div>
                <Textarea
                  className="mt-3"
                  placeholder="Note"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <div>
                <Button
                  className="text-red-500 border border-red-500"
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>

                <Button
                  className="ml-3"
                  type="submit"
                  disabled={!(selectedTimeSlot && date)}
                  onClick={() => saveBooking()}
                >
                  SUBMIT
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookAppointment;
