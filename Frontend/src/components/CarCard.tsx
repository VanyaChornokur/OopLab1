import { Button, Card } from "@radix-ui/themes";
import type { Car } from "~/api/types";
import { Modal } from "./Modal";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { routes } from "~/global/config/routes";
import { useCreateOrderMutation } from "~/api/mutations/mutations.hooks";

function CarCard({ carInfo }: { carInfo: Car }) {
   return (
      <Card className="!flex !justify-between !gap-4">
         <div>
            <h3 className="flex gap-4">
               <span>{carInfo.make}</span>
               <span className="text-(--gray-10)">{carInfo.model}</span>
            </h3>
            <div className="flex gap-4 mt-2">
               <p>${carInfo.pricePerDay} per day</p>
               <p className="text-(--gray-10)">{carInfo.year}</p>
            </div>
            <div className="flex gap-4 mt-2">
               {carInfo.isAvailable ? (
                  <p className="text-(--accent-9) flex gap-2 items-center">
                     <span>Available</span>
                     <i className="pi pi-check-circle" />
                  </p>
               ) : (
                  <p className="text-(--gray-6) flex gap-2 items-center">
                     <span>In Use</span>
                     <i className="pi pi-times-circle" />
                  </p>
               )}
            </div>
         </div>
         <CarModal carInfo={carInfo} />
      </Card>
   );
}

function CarModal({ carInfo }: { carInfo: Car }) {
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");

   const areDatesTypes = startDate && endDate;

   const errorMessage = useMemo(() => {
      if (areDatesTypes) {
         const from = new Date(startDate);
         const to = new Date(endDate);

         if (from > to) {
            return "From date cannot be later than To date";
         } else {
            return "";
         }
      }
      return "";
   }, [startDate, endDate]);

   const daysDiff = useMemo(() => {
      if (areDatesTypes) {
         const from = new Date(startDate);
         const to = new Date(endDate);

         if (from > to) return 0;

         const timeDiff = to.getTime() - from.getTime();
         const _daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

         return _daysDiff;
      }
      return 0;
   }, [startDate, endDate]);

   const navigate = useNavigate();

   const { mutateAsync, isPending } = useCreateOrderMutation();

   const submit = async () => {
      await mutateAsync({
         carId: carInfo.id,
         startDate,
         endDate,
         totalPrice: daysDiff * carInfo.pricePerDay
      });
      navigate(routes.account, { viewTransition: true });
   };

   return (
      <Modal
         viewTransitionName="user-order"
         trigger={<Button disabled={!carInfo.isAvailable}>Rent</Button>}
         content={
            <div>
               <Modal.Title>
                  <div className="flex justify-center gap-4">
                     <span>{carInfo.make}</span>
                     <span className="text-(--gray-10)">{carInfo.model}</span>
                  </div>
               </Modal.Title>
               <div className="flex gap-4 mt-2">
                  <p>${carInfo.pricePerDay} per day</p>
                  <p className="text-(--gray-10)">{carInfo.year}</p>
               </div>
               <div className="mt-2">
                  <div className="flex gap-4 mt-2">
                     <h2 className="!text-base !font-normal">Rent</h2>
                     <label>
                        <p>From</p>
                        <input
                           onChange={({ target }) => {
                              setStartDate(target.value);
                           }}
                           type="date"
                           className="p-1 border border-(--gray-6) rounded-(--radius-4)"
                        />
                     </label>
                     <label>
                        <p>To</p>
                        <input
                           onChange={({ target }) => {
                              setEndDate(target.value);
                           }}
                           type="date"
                           className="p-1 border border-(--gray-6) rounded-(--radius-4)"
                        />
                     </label>
                  </div>
                  <div className="text-(--red-9) mt-2 text-center">
                     {errorMessage}
                  </div>
                  {daysDiff !== 0 && (
                     <div className="text-(--accent-9) mt-2 text-center">
                        {daysDiff} days: Esimated Cost: $
                        {daysDiff * carInfo.pricePerDay}
                     </div>
                  )}
               </div>
               <div className="flex gap-4 justify-center mt-4">
                  <Modal.Close>
                     <Button variant="soft" color="gray">
                        Close
                     </Button>
                  </Modal.Close>
                  <Button
                     disabled={!!errorMessage || !areDatesTypes}
                     onClick={submit}
                     loading={isPending}
                  >
                     Continue
                  </Button>
               </div>
            </div>
         }
      />
   );
}

export { CarCard };
