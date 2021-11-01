import styled from 'styled-components'

function ViewToggleButton({ children, onClick }) {
  return (
    <ButtonContainer>
      <button onClick={onClick} data-testid="view-toggle-btn">
        {children}
      </button>
    </ButtonContainer>
  )
}

export default ViewToggleButton

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    padding: 5px 10px;
    background-color: transparent;
    width: 120px;
    border: 1px solid gray;
  }
`
