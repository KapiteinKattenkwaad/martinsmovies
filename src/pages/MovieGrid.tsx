import Navbar from "../components/Navbar"
import Header from "../components/Header"
import PageHeader from "../components/PageHeader"
import MoviesList from "../components/MoviesList"
import Footer from "../components/Footer"

export default function Homepage() {

  return (
    <div className="wrapper">
      <Navbar />
      <Header />
      <PageHeader />
      <MoviesList />
      <Footer />
    </div>
  )
}
