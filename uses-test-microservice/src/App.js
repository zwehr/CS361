import { useEffect, useState } from 'react';
import './App.css';
import { storage } from './firebaseconfig'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

function App() {
  const [data, setData] = useState('')
  const [imageUpload, setImageUpload] = useState(null)

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

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then(() => {
      alert('Image uploaded')
    })
  }

  return (
    <div className="App">
      <p>Message from server is: {data}</p>
      <img src={data}></img>

      <input type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default App;