import * as React from "react";
import { JSX } from "react/jsx-runtime";

function DashboardIcon(
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
        d="M15.75 6H6v9.75h9.75V6zM30.75 6H21v9.75h9.75V6zM15.75 21H6v9.75h9.75V21zM30.75 21H21v9.75h9.75V21z"
        stroke={props?.stroke}
        strokeWidth={2.25}
        strokeMiterlimit={10}
      />
    </svg>
  );
}

export default DashboardIcon;
