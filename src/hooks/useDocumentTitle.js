import React from 'react'

export function useDocumentTitle(value, resetValue) {
  React.useEffect(() => {
    if (value) {
      document.title = value
    }
    return () => {
      document.title = resetValue
    }
  }, [value, resetValue])
}
