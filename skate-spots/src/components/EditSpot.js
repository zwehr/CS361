import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../firebase/config'
import TagBubblesInteractive from './TagBubblesInteractive'
import Links from './Links'
import '../styles/EditSpot.css'

export default function EditSpot() {
  const [updateInProgress, setUpdateInProgress] = useState(false)
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('handrail')
  const [skateStopped, setSkateStopped] = useState('no')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [currYoutube, setCurrYoutube] = useState('')
  const [youtubeLinks, setYoutubeLinks] = useState([])
  const [description, setDescription] = useState('')
  const [currImageFileNames, setCurrImageFileNames] = useState([])
  const [newImageFiles, setNewImageFiles] = useState([])

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { spotData } = location.state

  useEffect(() => {
    console.log('Spot ID is: ', spotData.id)
    setLat(spotData.lat)
    setLng(spotData.lng)
    setName(spotData.name)
    setType(spotData.type)
    setSkateStopped(spotData.skateStopped)
    setTags(spotData.tags)
    setYoutubeLinks(spotData.youtubeLinks)
    setDescription(spotData.description)
    setCurrImageFileNames(spotData.images)
  }, [])

  useEffect(() => {
    // If user hit 'Space' key in tag text input, tag will be added to tags arr, input cleared
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
    setNewImageFiles([])
    Array.from(e.target.files).forEach((file) => {
      const newRandomName = file.name + v4()
      const newFileObj = { name: newRandomName, file: file }
      setNewImageFiles(oldFileObjs => [...oldFileObjs, newFileObj])
    })
  }

  const addYoutubeLink = () => {
    setYoutubeLinks(oldLinks => [...oldLinks, currYoutube])
    setCurrYoutube('')
  }

  const deleteYoutubeLink = (clickedLink) => {
    setYoutubeLinks(oldLinks => oldLinks.filter(link => link !== clickedLink))
  }

  // Prevents 'Enter' from submitting form
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setUpdateInProgress(true)

    newImageFiles.forEach((image) => {
      const imageRef = ref(storage, `spots/${image.name}`)
      uploadBytes(imageRef, image.file).then(() => {
        console.log('image uploaded')
      })
    })

    // Gets all the image names in one place before updating with arrayUnion() below.
    const imageNames = []
    newImageFiles.forEach((file) => {
      imageNames.push(file.name)
    })

    const spotRef = doc(db, "spots", spotData.id)

    try {
      await updateDoc(spotRef, {
        lat: lat,
        lng: lng,
        name: name,
        type: type,
        skateStopped: skateStopped,
        tags: tags,
        youtubeLinks: youtubeLinks,
        description: description,
        images: arrayUnion(...imageNames)
      });
      setUpdateInProgress(false)
      alert('Spot updated successfully!');
      navigate('/spots-list')
    } catch (e) {
      alert('Error adding document, check console');
      console.log(e)
    }
  }

  return (
    <div className='EditSpot'>
      <h2>Edit Spot</h2>
      <div className='form-container'>
        <form onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>
          <label htmlFor='lat'>Latitude:
            <input type='text' name='lat' id='lat' className='block-input' value={lat} onChange={(e) => setLat(e.target.value)} required />
          </label>
          <label htmlFor="lng">Longitude:
            <input type="text" name="lng" id="lng" className='block-input' value={lng} onChange={(e) => setLng(e.target.value)} required />
          </label>
          <label htmlFor="name">Name:
            <input type="text" name="name" id="name" className='block-input' value={name} onChange={(e) => setName(e.target.value)} required />
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
          <label htmlFor='tag'>Current Tags:
            <div className='tags-container'>{tags && <TagBubblesInteractive tags={tags} handleDeleteTag={handleDeleteTag} />}</div>
            <input type='text' name='tag' id='tag' className='block-input' value={tag} onChange={handleTagChange} />
            <p className='tag-directions'>(Type a tag and press SPACE to add it to the list. Use hyphens instead of spaces in tags, e.g. ride-on-grind)</p>
          </label>
          <label htmlFor="currYoutube">Current YouTube Links:
            <Links links={youtubeLinks} delete={deleteYoutubeLink} />
            <input type="text" name="currYoutube" id="currYoutube" className='youtube-input' value={currYoutube} onChange={(e) => setCurrYoutube(e.target.value)} />
            <input type='button' value='Add Youtube Link' className='add-youtube' onClick={addYoutubeLink} />
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
          <label htmlFor='photos'>Add Photos:
            <input type='file' multiple name='photos' id='photos' onChange={handleFileChange} />
          </label>
          <ul>
            {currImageFileNames.length > 0 && <p><strong>Current files: </strong></p>}
            {currImageFileNames.map((image) => <li>{image}</li>)}
            {newImageFiles.length > 0 && <p><strong>New files to be added: </strong></p>}
            {newImageFiles.map((image) => <li>{image.name}</li>)}
          </ul>
          <input type='submit' value='Confirm Changes' />
        </form>
      </div>
    </div>
  )
}