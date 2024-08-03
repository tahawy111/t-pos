import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

export const Icons = {
  Inventory: (props: LucideProps) => (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-white", props.className)}
      {...props}
    >
      <path
        d="M21 7v11.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V7"
        fill="#000000"
        fill-opacity=".16"
      />
      <path
        d="M21 7v11.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V7"
        stroke="#000000"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M21.4 3H2.6A1.6 1.6 0 0 0 1 4.6v.8A1.6 1.6 0 0 0 2.6 7h18.8A1.6 1.6 0 0 0 23 5.4v-.8A1.6 1.6 0 0 0 21.4 3Z"
        fill="#ffffff"
        stroke="#000000"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <path
        d="M8 11h8"
        stroke="#000000"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
    </svg>
  ),
  Products: (props: LucideProps) => (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      id="bag-alt-1"
      xmlns="http://www.w3.org/2000/svg"
      className="icon multi-color"
      {...props}
    >
      <title style={{ strokeWidth: 2 }}>bag alt 1</title>
      <path
        id="tertiary-fill"
        d="M4,14H20l-.88,6.14a1,1,0,0,1-1,.86H5.87a1,1,0,0,1-1-.86Z"
        style={{ fill: "#b7b7b7", strokeWidth: 2 }}
      />
      <path
        id="secondary-stroke"
        d="M9,3,7,9m8-6,2,6"
        style={{
          fill: "none",
          stroke: "rgb(44, 169, 188)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
      <path
        id="primary-stroke"
        d="M18.15,21H5.85a1,1,0,0,1-1-.84L3,9H21L19.14,20.16A1,1,0,0,1,18.15,21ZM12,17V13M8,17V13m8,4V13"
        style={{
          fill: "none",
          stroke: "rgb(0, 0, 0)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
    </svg>
  ),
  CartIcon: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
  ),
};
