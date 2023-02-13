import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [avatarData, setAvatarData] = useState([{}, {}, {}, {}, {}, {}]);

  const posts = [
    { userName: "Dan", userColor: "red", comment: "Wow sounds cool!" },
    { userName: "Kim", userColor: "green", comment: "Love it <3<3<3" },
    { userName: "Alex", userColor: "blue", comment: "This is amazing!!!" },
    { userName: "Blake", userColor: "blue", comment: "Yuck, terrible!" },
    { userName: "Darrell", userColor: "blue", comment: "@Blake why are you hating?" }
  ]

  useEffect(() => {
    fetch("http://localhost:4000/all").then(
      response => response.json()
    ).then(
      data => {
        setAvatarData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div className="App">
      <h1>Avatar Microservice Example</h1>
      {posts.map((post) =>
        <div className="post">
          <img src={avatarData[Math.floor(Math.random() * 5)].url} alt="avatar" className="avatar" />
          <p className="userName"><strong>{post.userName}</strong></p>
          <p>{post.comment}</p>
        </div>
      )}
    </div>
  );
}

export default App;
