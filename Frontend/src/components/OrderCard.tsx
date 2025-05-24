import { Button, Card, Separator } from "@radix-ui/themes";
import type { Order } from "~/api/types";
import { Modal } from "./Modal";
import { useState } from "react";
import { usePatchOrderMutation } from "~/api/mutations/mutations.hooks";

function OrderCard({ orderInfo }: { orderInfo: Order }) {
   const [isExpanded, setIsExpanded] = useState(false);

   return (
      <Card>
         <div className="flex gap-4 justify-between">
            <div className="">
               <div className="flex gap-4">
                  <h3 className="!text-sm text-(--gray-10)">
                     Id: {orderInfo.id}
                  </h3>
               </div>
               <div>
                  <p className="text-(--gray-10)">${orderInfo.totalPrice}</p>
               </div>

               <div className="flex gap-4">
                  <Modal
                     trigger={
                        <Button size="1" color="gray" variant="soft">
                           Car info
                        </Button>
                     }
                     content={<></>}
                  />
                  <Modal
                     trigger={
                        <Button size="1" color="gray" variant="soft">
                           Client info
                        </Button>
                     }
                     content={<></>}
                  />
               </div>
            </div>
            <div className="flex flex-col gap-2">
               <OrderStatus status={orderInfo.status} />
               <StatusActionButtons
                  status={orderInfo.status}
                  id={orderInfo.id}
               />
            </div>
         </div>
         <label className="flex gap-2 items-center py-2">
            <Separator className=" !grow-4" />
            <Button
               size="1"
               variant="ghost"
               color="gray"
               onClick={() => setIsExpanded((_) => !_)}
            >
               <i className="pi pi-angle-down" />
            </Button>
            <Separator className=" !grow-1" />
         </label>
         {isExpanded && (
            <div>
               <div>
                  <p className="text-(--gray-10)">
                     Start date: {orderInfo.startDate}
                  </p>
                  <p className="text-(--gray-10)">
                     End Date: {orderInfo.endDate}
                  </p>
               </div>
               <div></div>
            </div>
         )}
      </Card>
   );
}

type TOrderStatus = Order["status"];

const statusMap: Record<
   TOrderStatus,
   { label: string; icon: string; className: string }
> = {
   pending: {
      label: "Pending",
      icon: "pi pi-hourglass",
      className: "text-(--accent-9)"
   },
   paid: {
      label: "Paid",
      icon: "pi pi-dollar",
      className: "text-(--accent-9)"
   },
   active: {
      label: "Active",
      icon: "pi pi-car",
      className: "text-(--green-10)"
   },
   completed: {
      label: "Completed",
      icon: "pi pi-check-circle",
      className: "text-(--gray-7)"
   },
   rejected: {
      label: "Rejected",
      icon: "pi pi-times-circle",
      className: "text-(--red-7)"
   }
};

export function OrderStatus({ status }: { status: TOrderStatus }) {
   const { label, icon, className } = statusMap[status];

   return (
      <p className={`flex items-center gap-1 font-medium ${className}`}>
         {label} <i className={icon} />
      </p>
   );
}

function StatusActionButtons({
   status,
   id
}: {
   status: TOrderStatus;
   id: number;
}) {
   const { mutateAsync: rejectOrderAsync, isPending: isRejectingOrder } =
      usePatchOrderMutation();
   const rejectOrder = async () => {
      await rejectOrderAsync({ id, orderStatus: "rejected" });
   };
   const { mutateAsync: submitOrderAsync, isPending: isSubmittingOrder } =
      usePatchOrderMutation();

   const submitOrder = async () => {
      await submitOrderAsync({ id, orderStatus: "active" });
   };

   return (
      <>
         {["pending", "paid", "active"].includes(status) && (
            <Button
               color="red"
               variant="soft"
               size="1"
               onClick={rejectOrder}
               loading={isRejectingOrder}
            >
               Reject <i className="pi pi-times-circle" />
            </Button>
         )}
         {["paid"].includes(status) && (
            <Button
               variant="soft"
               size="1"
               onClick={submitOrder}
               loading={isSubmittingOrder}
            >
               Approve <i className="pi pi-check-circle" />
            </Button>
         )}
      </>
   );
}

export { OrderCard };
