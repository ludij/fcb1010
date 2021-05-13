import styled from "@emotion/styled"

type ledProps = {
  isActive: boolean
}

const SCLed = styled("div")<ledProps>`
  label: led;
  background-color: ${({ isActive }) => (isActive ? "#ff0000" : "#600")};
  width: 10px;
  height: 10px;
  border-radius: 100%;
  border: 2px solid #fff;
  box-shadow: ${({ isActive }) => (isActive ? "0 0 5px 2px #ff0000" : "none")};
`

export { SCLed }
