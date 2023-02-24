import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TagBubblesInteractive from './TagBubblesInteractive'
import '../styles/EditSpot.css'

export default function EditSpot() {
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('handrail')
  const [skateStopped, setSkateStopped] = useState('no')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [youtube, setYoutube] = useState('')
  const [description, setDescription] = useState('')
  const [imageFiles, setImageFiles] = useState([])

  const params = useParams()

  useEffect(() => {
    console.log(params.id)
  }, [])

  const handleSelectChange = (e) => {
    setType(e.target.value)
  }

  const handleRadioChange = (e) => {
    setSkateStopped(e.target.value)
  }

  const handleDeleteTag = (clickedTag) => {
    setTags(oldTags => {
      return oldTags.filter(tag => tag !== clickedTag)
    })
  }

  const handleTagChange = (e) => {
    setTag(e.target.value)
  }

  const handleFileChange = (e) => {
    console.log('inside handleFileChange(), e.target.files is ', e.target.files)
    setImageFiles([...e.target.files])
  }

  return (
    <div className='EditSpot'>
      <h2>Edit Spot</h2>
      <div className='form-container'>
        <form>
          <label htmlFor='lat'>Latitude:
            <input type='text' name='lat' id='lat' value={lat} onChange={(e) => setLat(e.target.value)} required />
          </label>
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
              <option value='bank'>Bank</option>
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
            <div className='tags-container'>{tags && <TagBubblesInteractive tags={tags} handleDeleteTag={handleDeleteTag} />}</div>
            <input type='text' name='tag' id='tag' value={tag} onChange={handleTagChange} />
            <p className='tag-directions'>(Type a tag and press SPACE to add it to the list. Use hyphens instead of spaces in tags, e.g. ride-on-grind)</p>
          </label>
          <label htmlFor="youtube">YouTube Link:
            <input type="text" name="youtube" id="youtube" value={youtube} onChange={(e) => setYoutube(e.target.value)} required />
          </label>
          <p className='youtube-directions'>NOTE: URL format must be https://www.youtube.com/<strong>embed</strong>/ZZ5vETmUYQA<strong>?start</strong>=139, NOT https://youtu.be/ZZ5vETmUYQA?<strong>t=139</strong></p>
          <p className='youtube-directions'>You can build this link yourself by ensuring that <strong>/embed</strong> and <strong>?start</strong> are included, or click the "Embed" option after clicking "Share" on YouTube (and take only the link from the embed code).</p>
          <label htmlFor='description'>Description:
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required></textarea>
          </label>
          <label htmlFor='photos'>Upload Photos:
            <input type='file' multiple name='photos' id='photos' onChange={handleFileChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  )
}