import { useState } from "react";
import { TweetButton } from "yggjs_rbutton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TweetButton href="https://www.baidu.com">测试</TweetButton>
    </>
  );
}

export default App;
