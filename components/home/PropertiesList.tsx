import PropertyCard from "../card/PropertyCard";
import type { PropertyCardProps } from "@/utils/types";
const PropertiesList = ({
  properties,
}: {
  properties: PropertyCardProps[];
}) => {
  return (
    <section className="mt-8 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 ">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
};

export default PropertiesList;
