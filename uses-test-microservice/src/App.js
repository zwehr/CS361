import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('')

  const server = "http://localhost:4000/messagefromCS361"

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch(
          server
        )
      ).text();
      // set state when the data received
      setData(data);
      console.log('data is: ', data);
    };

    dataFetch();
  }, []);

  return (
    <div className="App">
      <p>Message from server is: {data}</p>
    </div>
  );
}

export default App;
