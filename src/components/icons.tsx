import { HTMLAttributes } from 'react'

type IconProps = HTMLAttributes<SVGElement>

export const ChevronLeftIcon = ({ className, ...rest }: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M10.5 3.5 6 8l4.5 4.5" />
  </svg>
)

export const XIcon = ({ className, ...rest }: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

export const CheckIcon = ({ className, ...rest }: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
)

export const TrashIcon = ({ className, ...rest }: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M3.5 5.5h9" />
    <path d="M6 5.5V4h4v1.5" />
    <path d="M5.5 5.5v7m5-7v7" />
    <path d="M4.5 5.5 5 13h6l.5-7.5" />
  </svg>
)

export const SparkleIcon = ({ className, ...rest }: IconProps) => (
  <svg
    viewBox="0 0 20 20"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M10 2.5 11.8 7l4.7 1.2-4.7 1.2L10 14l-1.8-4.6-4.7-1.2L8.2 7 10 2.5z" />
    <path d="M15.5 3.5 16 5l1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5L15 5l.5-1.5z" />
  </svg>
)

export const DonationIcon = ({ className, ...rest }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M4 14c2-2 4-3 7-3h6c1.2 0 2 .8 2 2s-.8 2-2 2h-5" />
    <path d="M4 14v5h9c3 0 5-1 7-3" />
    <path d="M14.5 7.5a2.5 2.5 0 1 0-5 0c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5z" />
  </svg>
)

export const StarIcon = ({ className, ...rest }: IconProps) => (
  <svg
    viewBox="0 0 20 20"
    width="14"
    height="14"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <path d="M10 1.8 12.3 7l5.6.8-4 3.9.9 5.5L10 14.6 5.2 17.2l.9-5.5-4-3.9L7.7 7 10 1.8z" />
  </svg>
)
