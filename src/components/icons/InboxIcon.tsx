import * as React from "react";
import { JSX } from "react/jsx-runtime";

function InboxIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width={props.width || 36}
      height={props.height || props.width || 36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M31.5 11.205H3.75V30H31.5V11.205z"
        stroke={props?.stroke}
        strokeWidth={2.25}
        strokeMiterlimit={10}
      />
      <path
        d="M23.73 17.595H11.52v6.015h12.21v-6.015zM11.625 11.205V5.25h12v5.955"
        stroke={props?.stroke}
        strokeWidth={2.25}
        strokeMiterlimit={10}
      />
    </svg>
  );
}

export default InboxIcon;
