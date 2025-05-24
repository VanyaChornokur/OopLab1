import { Checkbox, Select, Skeleton } from "@radix-ui/themes";
import { useMemo, useState } from "react";
import { useAllCarsQuery } from "~/api/queries/queries.hooks";
import { CarCard } from "~/components/CarCard";
import { PageTitleVT } from "~/components/PageTitleVT";

type SortType = "cheapest" | "mostExpensive" | "newest" | "oldest";

function Home() {
   const { data: cars = [], isPending } = useAllCarsQuery();

   const [isOnlyAvailable, setIsOnlyAvailable] = useState(false);
   const [sortType, setSortType] = useState<SortType>("newest");

   const displayCars = useMemo(() => {
      if (cars.length === 0) return [];
      let filtered = [...cars];

      if (isOnlyAvailable) {
         filtered = filtered.filter((car) => car.isAvailable);
      }

      switch (sortType) {
         case "cheapest":
            filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
            break;
         case "mostExpensive":
            filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
            break;
         case "newest":
            filtered.sort((a, b) => b.year - a.year);
            break;
         case "oldest":
            filtered.sort((a, b) => a.year - b.year);
            break;
      }

      return filtered;
   }, [cars, isOnlyAvailable, sortType]);

   return (
      <>
         <PageTitleVT>Cars Catalog</PageTitleVT>
         <section className="px-4 py-2 flex justify-between items-end">
            <label className="flex gap-2 items-center">
               <span>Available</span>
               <Checkbox
                  checked={isOnlyAvailable}
                  onCheckedChange={(val) => setIsOnlyAvailable(!!val)}
               />
            </label>
            <Select.Root
               value={sortType}
               onValueChange={(val: SortType) => setSortType(val)}
            >
               <Select.Trigger />
               <Select.Content>
                  <Select.Group>
                     <Select.Item value="cheapest">Cheapest</Select.Item>
                     <Select.Item value="mostExpensive">
                        Most expensive
                     </Select.Item>
                     <Select.Item value="newest">Newest</Select.Item>
                     <Select.Item value="oldest">Oldest</Select.Item>
                  </Select.Group>
               </Select.Content>
            </Select.Root>
         </section>
         <section>
            <ul className="p-4 grid md:grid-cols-2 gap-4">
               {isPending && (
                  <>
                     <li>
                        <Skeleton className="!h-[116px]" />
                     </li>
                     <li>
                        <Skeleton className="!h-[116px]" />
                     </li>
                     <li>
                        <Skeleton className="!h-[116px]" />
                     </li>
                  </>
               )}
               {displayCars?.length > 0 &&
                  displayCars.map((car, i) => (
                     <li
                        key={car.id}
                        style={{
                           viewTransitionName:
                              i + 1 === displayCars.length
                                 ? "new-car"
                                 : undefined
                        }}
                     >
                        <CarCard carInfo={car} />
                     </li>
                  ))}
               {!isPending && displayCars?.length === 0 && (
                  <li>
                     <p>No cars available</p>
                  </li>
               )}
            </ul>
         </section>
      </>
   );
}

export { Home };
