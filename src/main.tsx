import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

class CustomReactFormElement extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this)
    root.render(<App element={this} />)
  }
}

customElements.define("custom-react-form", CustomReactFormElement)

