import { type SVGProps } from 'react'

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21.262 10.178a10.771 10.771 0 0 0-12.574-.296c-5.65 3.865-6.308 11.953-1.357 16.68l15.806 15.092a1.25 1.25 0 0 0 1.726 0l15.803-15.09c4.952-4.729 4.293-12.816-1.358-16.682a10.772 10.772 0 0 0-12.577.299L24 12.246l-2.738-2.068Z"
      ></path>
    </svg>
  )
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20 6C12.268 6 6 12.268 6 20s6.268 14 14 14a13.94 13.94 0 0 0 8.976-3.256l10.89 10.89a1.25 1.25 0 0 0 1.768-1.768l-10.89-10.89A13.944 13.944 0 0 0 34 20c0-7.732-6.268-14-14-14ZM8.5 20c0-6.351 5.149-11.5 11.5-11.5S31.5 13.649 31.5 20S26.351 31.5 20 31.5S8.5 26.351 8.5 20Z"
      ></path>
    </svg>
  )
}
