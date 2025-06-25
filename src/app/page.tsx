import About from '@/components/About'
import Featured from '@/components/Featured'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <About />
    </>
  )
}
