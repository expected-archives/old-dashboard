import { css } from "@emotion/core"
import { Align } from "."
import { styled } from "../../style"

type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

interface IProps {
  auto?: boolean
  alignSelf?: Align
  justifySelf?: Align
  extraSmall?: Size
  small?: Size
  medium?: Size
  large?: Size
  extraLarge?: Size
}

export default styled.div<IProps>(props => {
  const flex = (size?: Size) => {
    const grow = Number(!(props.auto || props.extraSmall || props.small ||
      props.medium || props.large || props.extraLarge))
    const width = size ? ((size / 12) * 100) : (props.auto ? "auto" : "")
    return `${grow} 0 ${width}`
  }

  return css`
    position: relative;
    align-self: ${props.alignSelf || "inherit"};
    justify-self: ${props.justifySelf || "inherit"};
    width: ${props.auto ? "auto" : "100%"};
    flex: ${flex(props.extraSmall)};
    
    @media (min-width: 576px) {
      flex: ${flex(props.small)};
    }
    
    @media (min-width: 768px) {
      flex: ${flex(props.medium)};
    }
    
    @media (min-width: 992px) {
      flex: ${flex(props.large)};
    }
    
    @media (min-width: 1200px) {
      flex: ${flex(props.extraLarge)};
    }
  `
})