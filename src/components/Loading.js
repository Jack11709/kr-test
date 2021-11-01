import styled from 'styled-components'

function Loading() {
  return (
    <MessageContainer data-testid="loading">
      🌱 fetching from the garden.....
    </MessageContainer>
  )
}

export default Loading

export const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 300px;
`
