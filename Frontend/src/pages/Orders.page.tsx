import { Skeleton } from "@radix-ui/themes";
import { useMemo } from "react";
import { useAllOrdersQuery } from "~/api/queries/queries.hooks";
import type { Order } from "~/api/types";
import { OrderCard } from "~/components/OrderCard";
import { PageTitleVT } from "~/components/PageTitleVT";

function Orders() {
   const { data: orders = [], isPending } = useAllOrdersQuery();

   const pendingOrPaidOrders = useMemo(
      () =>
         orders.filter(
            (order) => order.status === "pending" || order.status === "paid"
         ),
      [orders]
   );

   const activeOrders = useMemo(
      () => orders.filter((order) => order.status === "active"),
      [orders]
   );

   const completedOrRejectedOrders = useMemo(
      () =>
         orders.filter(
            (order) =>
               order.status === "completed" || order.status === "rejected"
         ),
      [orders]
   );

   return (
      <>
         <PageTitleVT>Orders</PageTitleVT>
         <div className="grid md:grid-cols-3 gap-4">
            <section>
               <h2 className="p-2">Pending</h2>
               <OrderList isPending={isPending} orders={pendingOrPaidOrders} />
            </section>
            <section>
               <h2 className="p-2">Active</h2>
               <OrderList isPending={isPending} orders={activeOrders} />
            </section>
            <section>
               <h2 className="p-2">Archive</h2>
               <OrderList isPending={isPending} orders={completedOrRejectedOrders} />
            </section>
         </div>
      </>
   );
}

function OrderList({
   orders,
   isPending
}: {
   orders: Order[];
   isPending: boolean;
}) {
   return (
      <ul className="grid gap-4">
         {isPending && (
            <li>
               <Skeleton className="!h-[116px]" />
            </li>
         )}
         {orders?.length > 0 &&
            orders.map((order) => (
               <li key={order.id}>
                  <OrderCard orderInfo={order} />
               </li>
            ))}
         {!isPending && orders?.length === 0 && (
            <li>
               <p>No orders found</p>
            </li>
         )}
      </ul>
   );
}

export { Orders };
