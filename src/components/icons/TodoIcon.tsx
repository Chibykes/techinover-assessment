import * as React from "react";
import { JSX } from "react/jsx-runtime";

function TodoIcon(
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
      <g clipPath="url(#clip0_14_4255)">
        <path
          d="M31.875 9.75H4.125v20.625h27.75V9.75zM9.75 4.5v9M26.25 4.5v9"
          stroke={props?.stroke}
          strokeWidth={2.25}
          strokeMiterlimit={10}
        />
        <path
          d="M12.75 15h-6v6h6v-6zM19.5 15h-3v3h3v-3zM24.375 15h-3v3h3v-3zM29.25 15h-3v3h3v-3zM19.5 19.5h-3v3h3v-3zM24.375 19.5h-3v3h3v-3zM29.25 19.5h-3v3h3v-3zM19.5 24h-3v3h3v-3zM14.625 24h-3v3h3v-3zM9.75 24h-3v3h3v-3zM24.375 24h-3v3h3v-3zM29.25 24h-3v3h3v-3z"
          stroke={props?.stroke}
        />
      </g>
      <defs>
        <clipPath id="clip0_14_4255">
          <path fill="#fff" transform="translate(3 4.5)" d="M0 0H30V27H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default TodoIcon;
