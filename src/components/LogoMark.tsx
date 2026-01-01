import type { ImgHTMLAttributes } from 'react'
import Logo from '../assets/icons/Logo.svg'

type LogoMarkProps = ImgHTMLAttributes<HTMLImageElement> & {
  size?: number
  variant?: 'color' | 'mono'
}

const LogoMark = ({ size = 28, variant = 'color', className, ...rest }: LogoMarkProps) => {
  return (
    <img
      src={Logo}
      alt="Logo"
      width={size}
      height={size}
      className={className}
      {...rest}
    />
  )
}

export default LogoMark
