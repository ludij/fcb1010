/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

interface ModalProps {
  isVisible: boolean
  toggleVisibility: () => void
}

const CModal = ({
  isVisible = false,
  toggleVisibility,
}: ModalProps): JSX.Element => {
  const sModal = css`
    label: modal;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    transform: ${isVisible ? "none" : "translateY(-100%)"};
    opacity: ${isVisible ? "1" : "0"};
    transition: ${isVisible ? "opacity 0.5s" : "opacity 0.5s transform 0 0.5s"};
  `
  return (
    <div css={sModal}>
      <button type="button" onClick={toggleVisibility}>
        close modal
      </button>
    </div>
  )
}

export { CModal }
