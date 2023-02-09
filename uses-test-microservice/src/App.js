import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('')

  const server = "http://localhost:4000/"

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          server
        )
      )
      // set state when the data received
      setData(data);
      console.log('data is: ', data);
    };

    dataFetch();
  }, []);

  return (
    <div className="App">
      <p>Message from server is: {data}</p>
      <img src={data}></img>
    </div>
  );
}

export default App;