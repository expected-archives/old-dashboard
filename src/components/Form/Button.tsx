import { css } from "@emotion/core"
import { Link } from "react-router-dom"
import { styled } from "../../style"

type Color = "blue" | "green"

interface IProps {
  color?: Color
  outline?: boolean
  block?: boolean
}

export const Button = styled.button<IProps>`
  display: inline-block;
  font-weight: 400;
  color: ${props => props.theme.text.normal};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:hover {
    text-decoration: none;
  }
  
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
  
  ${props => props.color && css`
    color: ${props.outline ? props.theme.color[props.color] : props.theme.color.light};
    background: ${props.outline ? props.theme.color.light : props.theme.color[props.color]};
    border-color: ${props.outline ? props.theme.color.grey : props.theme.color[props.color]};
    
    &:hover {
      color: ${props.theme.color.light};
      background: ${props.outline ? props.theme.color[props.color] : (props.theme.color as any)[`${props.color}Dark`]};
      border-color: ${props.outline ? props.theme.color[props.color] : (props.theme.color as any)[`${props.color}Dark`]};
    }
  `}
`

export const ButtonLink = Button.withComponent(Link)
