import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/bootstrap.min.css'
import './styles/jquery-mmenu.css'
import './styles/index.css'
import './styles/responsive.css'
import './styles/themify-icons.css'
import MovieGrid from './pages/MovieGrid'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MovieGrid />
  </StrictMode>,
)
