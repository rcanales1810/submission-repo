import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const persons = [
  {
    name: 'Arto Hellas',
    number: '1111-1111',
    id: 0
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App persons={persons} />
)