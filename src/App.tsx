import './App.css'
import AccommodationForm from './components/AccommodationForm'
import { FormProvider } from './context/FormContext'

function App({ element }: { element: HTMLElement }) {

  return (
    <>
      <FormProvider>
        <AccommodationForm element={element} />
      </FormProvider>
    </>
  )
}

export default App
