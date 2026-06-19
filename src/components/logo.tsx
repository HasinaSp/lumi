// components/logo.tsx
"use client";

import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image
        src="/lumi-logo/lumi-logo-light-vector.svg"
        alt="Logo LUMI"
        width={160}
        height={80}
        priority
        className="block dark:hidden"
      />

      <Image
        src="/lumi-logo/lumi-logo-dark-vector.svg"
        alt="Logo LUMI"
        width={160}
        height={80}
        priority
        className="hidden dark:block"
      />
    </>
  );
}