import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [avatarData, setAvatarData] = useState([{}, {}, {}, {}, {}, {}]);

  const posts = [
    { userName: "Dan", comment: "Wow sounds cool!" },
    { userName: "Kim", comment: "Love it <3<3<3" },
    { userName: "Alex", comment: "This is amazing!!!" },
    { userName: "Blake", comment: "Yuck, terrible!" },
    { userName: "Darrell", comment: "@Blake why are you hating?" }
  ]

  useEffect(() => {
    fetch("https://cs361-avatar-microservice.onrender.com/all").then(
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
