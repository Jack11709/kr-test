import { MessageContainer } from './Loading'

function ErrorMessage() {
  return (
    <MessageContainer data-testid="error-message">
      <p>🌱 Sorry something went wrong 🌱</p>
      <p>Please refresh the page, or try again later</p>
    </MessageContainer>
  )
}

export default ErrorMessage
