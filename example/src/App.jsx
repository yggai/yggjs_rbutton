import { useState } from 'react'
import { TweetButton } from 'yggjs_rbutton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <TweetButton />
    </>
  )
}

export default App
