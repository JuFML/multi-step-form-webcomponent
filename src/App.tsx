import './App.css'
import AccommodationForm from './components/AccommodationForm'

function App({ element }: { element: HTMLElement }) {

  return (
    <>
      <AccommodationForm element={element} />
    </>
  )
}

export default App
