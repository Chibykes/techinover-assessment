import * as React from "react";
import { JSX } from "react/jsx-runtime";

function NotesIcon(
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
        d="M6 10.5h24M6 18h24M6 25.5h24"
        stroke={props?.stroke}
        strokeWidth={2.25}
        strokeMiterlimit={10}
      />
    </svg>
  );
}

export default NotesIcon;
