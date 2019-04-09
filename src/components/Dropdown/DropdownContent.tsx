import { styled } from "../../style"

export default styled.div`
  position: absolute;
  will-change: transform;
  top: -10px;
  left: -10px;
  transform: translate3d(0, 38px, 0);
  border: 1px solid #edf2f9;
  box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
  background-color: ${props => props.theme.color.light};
  border-radius: .25rem;
  padding: .4rem 0;
  z-index: 1000;
  float: left;
  min-width: 10rem;
`
