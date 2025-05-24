import { Button } from "@radix-ui/themes";
import type { Order } from "~/api/types";
import { OrderStatus } from "./OrderCard";
import { Modal } from "./Modal";
import { usePatchOrderMutation } from "~/api/mutations/mutations.hooks";
import { useCloseModal } from "~/global/hooks/useCloseModal";
import { Link } from "react-router";
import { routes } from "~/global/config/routes";

function AccountOrderData({ orderInfo }: { orderInfo: Order }) {
   const { mutateAsync: rejectOrderAsync, isPending: isRejectingOrder } =
      usePatchOrderMutation();
   const rejectOrder = async () => {
      await rejectOrderAsync({ id: orderInfo.id, orderStatus: "rejected" });
   };
   const { mutateAsync: submitOrderAsync, isPending: isSubmittingOrder } =
      usePatchOrderMutation();

   const { closeButtonRef, closeModal } = useCloseModal();

   const submitOrder = async () => {
      await submitOrderAsync({ id: orderInfo.id, orderStatus: "paid" });
      closeModal();
   };

   return (
      <div>
         <div className="flex gap-4 justify-between">
            <div className="grow-1">
               <h3 className="flex justify-center gap-4">
                  <span>{orderInfo.carDto.make}</span>
                  <span className="text-(--gray-10)">
                     {orderInfo.carDto.model}
                  </span>
               </h3>
               <div className="flex gap-2 mt-2">
                  <p className="text-(--gray-10)">
                     ${orderInfo.carDto.pricePerDay} per day
                  </p>
                  <p className="text-(--gray-10)">{orderInfo.carDto.year}</p>
               </div>
            </div>
            <div className="">
               <OrderStatus status={orderInfo.status} />
            </div>
         </div>
         <div>
            <div>
               <p className="text-(--gray-10)">
                  Start date: {orderInfo.startDate}
               </p>
               <p className="text-(--gray-10)">End Date: {orderInfo.endDate}</p>
            </div>
            <div>
               <p className="text-(--accent-10)">
                  Total price - ${orderInfo.totalPrice}
               </p>
            </div>
            <div className="flex gap-4 justify-center mt-4">
               {["rejected", "completed"].includes(orderInfo.status) && (
                  <Link
                     to={routes.home}
                     viewTransition
                     className="flex items-center"
                  >
                     <Button variant="soft" color="gray">
                        Browse Cars
                     </Button>
                  </Link>
               )}
               {["active", "paind"].includes(orderInfo.status) && (
                  <Button
                     color="red"
                     variant="soft"
                     onClick={rejectOrder}
                     loading={isRejectingOrder}
                  >
                     Cancel rent <i className="pi pi-times-circle" />
                  </Button>
               )}
               {orderInfo.status === "pending" && (
                  <>
                     <Button
                        variant="soft"
                        color="gray"
                        onClick={rejectOrder}
                        loading={isRejectingOrder}
                     >
                        Cancel
                     </Button>
                     <Modal
                        trigger={
                           <Button>
                              Confirm & pay <i className="pi pi-dollar" />
                           </Button>
                        }
                        content={
                           <>
                              <Modal.Title>Rent payment</Modal.Title>
                              <p className="mt-2 text-center text-(--gray-10)">
                                 Future payment process goes here
                              </p>
                              <div className="flex mt-4 gap-2 justify-center">
                                 <Modal.Close>
                                    <Button
                                       variant="soft"
                                       color="gray"
                                       ref={closeButtonRef}
                                    >
                                       Close
                                    </Button>
                                 </Modal.Close>
                                 <Button
                                    onClick={submitOrder}
                                    loading={isSubmittingOrder}
                                 >
                                    Submit
                                 </Button>
                              </div>
                           </>
                        }
                     />
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export { AccountOrderData };
