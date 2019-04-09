import { css } from "@emotion/core"
import { Align } from "."
import { styled } from "../../style"

type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto"

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
  const width = (size?: Size) => {
    if (size === undefined) {
      return ""
    }
    if (size === "auto") {
      return "auto"
    }
    return `${((size / 12) * 100)}%`
  }

  const flex = (size?: Size) => {
    const grow = Number(!(props.extraSmall || props.small ||
      props.medium || props.large || props.extraLarge))
    return `${grow} 0 ${width(size)}`
  }

  return css`
    position: relative;
    align-self: ${props.alignSelf || "inherit"};
    justify-self: ${props.justifySelf || "inherit"};
    max-width: ${width(props.extraSmall)};
    flex: ${flex(props.extraSmall)};
    padding: 0 15px;
    
    ${props.small && css`
      @media (min-width: 576px) {
        max-width: ${width(props.small)};
        flex: ${flex(props.small)};
      }
    `}
    ${props.medium && css`
      @media (min-width: 768px) {
        max-width: ${width(props.medium)};
        flex: ${flex(props.medium)};
      }
    `}
    ${props.large && css`    
      @media (min-width: 992px) {
        max-width: ${width(props.large)};
        flex: ${flex(props.large)};
      }
    `}
    ${props.extraLarge && css`
      @media (min-width: 1200px) {
        max-width: ${width(props.extraLarge)};
        flex: ${flex(props.extraLarge)};
      }
    `}
  `
})
