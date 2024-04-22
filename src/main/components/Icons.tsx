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

export function FluentPlay(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3 2.862a1 1 0 0 1 1.496-.868l5.492 3.138a1 1 0 0 1 0 1.736l-5.492 3.139A1 1 0 0 1 3 9.139V2.862ZM9.492 6L4 2.862v6.277L9.492 6Z"
      ></path>
    </svg>
  )
}

export function MaterialSymbolsClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
      ></path>
    </svg>
  )
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="2.8" height="12" x="1" y="6" fill="currentColor">
        <animate
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
      <rect width="2.8" height="12" x="5.8" y="6" fill="currentColor">
        <animate
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
      <rect width="2.8" height="12" x="10.6" y="6" fill="currentColor">
        <animate
          id="svgSpinnersBarsScaleMiddle0"
          attributeName="y"
          begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
      <rect width="2.8" height="12" x="15.4" y="6" fill="currentColor">
        <animate
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
      <rect width="2.8" height="12" x="20.2" y="6" fill="currentColor">
        <animate
          id="svgSpinnersBarsScaleMiddle1"
          attributeName="y"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="6;1;6"
        ></animate>
        <animate
          attributeName="height"
          begin="svgSpinnersBarsScaleMiddle0.begin+0.4s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".14,.73,.34,1;.65,.26,.82,.45"
          values="12;22;12"
        ></animate>
      </rect>
    </svg>
  )
}