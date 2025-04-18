"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

function MyBooking() {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    user && getUserBookingList();
  }, [user]);

  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email).then((resp) => {
      console.log("BookingList:", resp.data.data);
      setBookingList(resp.data.data);
    });
  };

  const filterUserBooking = (type) => {
    const result = bookingList.filter((item) =>
      type == "upcoming"
        ? new Date(item.Date) >= new Date()
        : new Date(item.Date) <= new Date()
    );
    console.log(result);
    return result;
  };
  return (
    <div className="px-4  sm:px-10 mt-10">
      <h2 className="text-2xl font-bold"> My Booking</h2>
      <Tabs defaultValue="account" className="mt-5 w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookingList={filterUserBooking("upcoming")}
            updateRecord={() => getUserBookingList()}
            expired={false}
          />
        </TabsContent>

        <TabsContent value="expired">
          <BookingList
            bookingList={filterUserBooking("expired")}
            updateRecord={() => getUserBookingList()}
            expired={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
