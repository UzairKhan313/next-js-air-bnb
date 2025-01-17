"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const SharedButton = ({
  propertyId,
  name,
}: {
  propertyId: string;
  name: string;
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/properties/${propertyId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="p-2">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <FacebookShareButton url={shareLink} title={name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={shareLink} title={name}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </PopoverContent>
    </Popover>
  );
};

export default SharedButton;
