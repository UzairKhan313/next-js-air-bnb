import { redirect } from "next/navigation";

import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BookingCalender from "@/components/properties/BookingCalender";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertiesDetails";
import SharedButton from "@/components/properties/SharedButton";
import UserInfo from "@/components/properties/UserInfo";
import { fetchPropertyDetails } from "@/utils/actions";
import { Separator } from "@/components/ui/separator";
import Description from "@/components/properties/Description";
import Amenities from "@/components/properties/Amenities";
import MapWrapper from "@/components/properties/MapWrapper";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import { findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";

const PropertyDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const property = await fetchPropertyDetails(id);

  if (!property) redirect("/");
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

  const { userId } = await auth();
  const isNotOwner = property.profile.clerkId !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold capitalize">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <SharedButton propertyId={property.id} name={property.name} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-4 item-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <MapWrapper countryCode={property.country} />
        </div>

        <div className="lg:col-span-4 flex flex-col items-center">
          {/* Calender  */}
          <BookingCalender />
        </div>
      </section>

      {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
      <PropertyReviews propertyId={property.id} />
    </section>
  );
};

export default PropertyDetailsPage;
