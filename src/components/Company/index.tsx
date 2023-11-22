import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { CompaniesTier } from "@/utils/GetColorTier";

import { ModalInformation } from "../../types/ModalProps";

export interface CompanyProps {
  logoHref: StaticImageData;
  name: string;
  websiteUrl?: string;
  modalInformation?: ModalInformation;
  tier?: CompaniesTier;
}

const Company: React.FC<CompanyProps> = ({ logoHref, name, websiteUrl }) => {
  return (
    <div className="flex min-h-[8rem] items-center justify-center transition duration-300 ease-in-out hover:scale-105 lg:min-h-[11rem]">
      <Link
        rel="noreferrer"
        href={websiteUrl ? websiteUrl : "/company/" + name}
        target="_blank"
      >
        <Image
          className="h-full max-h-36 w-full max-w-[10rem] object-cover lg:max-h-28 lg:max-w-[10rem]"
          src={logoHref}
          alt={name}
        />
      </Link>
    </div>
  );
};

export default Company;
