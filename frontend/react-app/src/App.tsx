import { useEffect, useState } from 'react'

type HealthResponse = {
  message: string
}

function App() {
  const [message, setMessage] = useState('Checking backend...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function checkHealth() {
      try {
        const response = await fetch('/health', { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Health check failed (${response.status})`)
        }

        const data = (await response.json()) as HealthResponse
        setMessage(data.message)
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : 'Health check failed')
        }
      }
    }

    void checkHealth()
    return () => controller.abort()
  }, [])

  return (
    <main>
      <h1>Backend health</h1>
      <p role={error ? 'alert' : 'status'}>{error ?? message}</p>
    </main>
  )
}

export default App
