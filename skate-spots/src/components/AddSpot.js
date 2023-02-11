import { useEffect, useState } from 'react'
import Map from 'react-map-gl'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { HiCursorClick } from 'react-icons/hi';
import '../styles/AddSpot.css'
import TagBubblesInteractive from './TagBubblesInteractive';

export default function AddSpot() {
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('handrail')
  const [skateStopped, setSkateStopped] = useState('no')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState(null)
  const [description, setDescription] = useState('')

  useEffect(() => {
    // If user hit 'Space' key in tag text input, tag will be added to tags, input cleared
    if (tag.charAt(tag.length - 1) === ' ') {
      // ...but if user hits 'Space' when field is blank, nothing happens (aside from the space being deleted)
      if (tag === ' ') {
        setTag('')
      } else {
        tags ? setTags([...tags, tag.trim()]) : setTags([tag.trim()])
        setTag('')
      }
    }
  }, [tag, tags])

  const handleClick = (e) => {
    setLat(e.lngLat.lat)
    setLng(e.lngLat.lng)
  }

  const handleSelectChange = (e) => {
    setType(e.target.value)
  }

  const handleRadioChange = (e) => {
    setSkateStopped(e.target.value)
  }

  const handleTagChange = (e) => {
    setTag(e.target.value)
  }

  const handleDeleteClick = (clickedTag) => {
    setTags(oldTags => {
      return oldTags.filter(tag => tag !== clickedTag)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "spots"), {
        lat: lat,
        lng: lng,
        name: name,
        type: type,
        skateStopped: skateStopped,
        tags: tags,
        description: description,
      });
      alert("Spot saved successfully!");
      setLat('')
      setLng('')
      setName('')
      setDescription('')
      setTags([])
    } catch (e) {
      alert("Error adding document: ", e);
    }
  }

  return (
    <div className='AddSpot'>
      <h2>Add Spot</h2>
<<<<<<< HEAD
      <div className='map-form-container'>
        <div className='add-map-container half-map-form-container'>
          <Map
            initialViewState={{
              longitude: -30,
              latitude: 30,
              zoom: 1
            }}
            style={{ width: '100%', height: '560px', cursor: 'crosshair', borderRadius: '10px' }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            mapboxAccessToken={process.env.REACT_APP_MB}
            onClick={handleClick}
            className="add-map"
          >
          </Map>
        </div>
        <div className='form-container half-map-form-container'>
          <p className='add-instructions'><HiCursorClick /> <strong>Click on the map to fill latitude and longitude fields.</strong></p>
          <form onSubmit={handleSubmit} className="add-form">
            <label htmlFor="lat">Latitude:
              <input type="text" name="lat" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} required />
            </label>
            <label htmlFor="lng">Longitude:
              <input type="text" name="lng" id="lng" value={lng} onChange={(e) => setLng(e.target.value)} required />
            </label>
            <label htmlFor="name">Name:
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label htmlFor='type'>Type:
              <select value={type} onChange={handleSelectChange}>
                <option value='handrail'>Handrail</option>
                <option value='stairs'>Stairs</option>
                <option value='gap'>Gap</option>
                <option value='ledge'>Ledge</option>
                <option value='pad'>Manual Pad</option>
                <option value='hubba'>Hubba</option>
                <option value='curb'>Curb</option>
                <option value='bump'>Bump to bar</option>
                <option value='misc'>Misc</option>
              </select>
            </label>
            <label htmlFor='skate-stopped'>Skate-stopped?
              <input type='radio' value='yes' name='skate-stopped' checked={skateStopped === 'yes'} onChange={handleRadioChange} />Yes
              <input type='radio' value='no' name='skate-stopped' checked={skateStopped === 'no'} onChange={handleRadioChange} />No
            </label><br></br>
            <label htmlFor='tag'>Tags:
              <div className='tags-container'>{tags && <TagBubblesInteractive tags={tags} handleDeleteClick={handleDeleteClick} />}</div>
              <input type='text' name='tag' id='tag' value={tag} onChange={handleTagChange} />
              <p className='tag-directions'>(Type a tag and press SPACE to add it to the list. Use hyphens instead of spaces in tags, e.g. ride-on-grind)</p>
            </label>
            <label htmlFor='description'>Description:
              <textarea
                name='description'
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required></textarea>
            </label>
            <input type='submit' value='Submit' />
          </form>
        </div>
=======
      <div className='add-map-container'>
        <Map
          initialViewState={{
            longitude: -30,
            latitude: 30,
            zoom: 2
          }}
          style={{ width: '900px', height: '570px', cursor: 'crosshair', borderRadius: '10px', marginTop: '20px' }}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxAccessToken={process.env.REACT_APP_MB}
          onClick={handleClick}
          className="add-map"
        >

        </Map>
      </div>
      <div className='form-container'>
        <p className='add-instructions'><HiCursorClick /> <strong>Click on the map to fill latitude and longitude fields.</strong></p>
        <form onSubmit={handleSubmit} className="add-form">
          <label htmlFor="lat">Latitude:
            <input type="text" name="lat" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} required />
          </label>
          <label htmlFor="lng">Longitude:
            <input type="text" name="lng" id="lng" value={lng} onChange={(e) => setLng(e.target.value)} required />
          </label>
          <label htmlFor="name">Name:
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label htmlFor='type'>Type:
            <select value={type} onChange={handleSelectChange}>
              <option value='handrail'>Handrail</option>
              <option value='stairs'>Stairs</option>
              <option value='gap'>Gap</option>
              <option value='ledge'>Ledge</option>
              <option value='pad'>Manual Pad</option>
              <option value='hubba'>Hubba</option>
              <option value='curb'>Curb</option>
              <option value='bump'>Bump to bar</option>
              <option value='misc'>Misc</option>
            </select>
          </label>
          <label htmlFor='skate-stopped'>Skate-stopped?
            <input type='radio' value='yes' name='skate-stopped' checked={skateStopped === 'yes'} onChange={handleRadioChange} />Yes
            <input type='radio' value='no' name='skate-stopped' checked={skateStopped === 'no'} onChange={handleRadioChange} />No
          </label><br></br>
          <label htmlFor='tag'>Tags: {tags && <TagBubblesInteractive tags={tags} handleDeleteClick={handleDeleteClick} />}
            <input type='text' name='tag' id='tag' value={tag} onChange={handleTagChange} />
            <p className='tag-directions'>(Type a tag and press SPACE to add it to the list. Use hyphens instead of spaces in tags, e.g. ride-on-grind)</p>
          </label>
          <label htmlFor='description'>Description:
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required></textarea>
          </label>
          <input type='submit' value='Submit' />
        </form>
>>>>>>> cfd12ad85ccf48bad3618db4a97a60b18a8ded1a
      </div>
    </div >
  )
}