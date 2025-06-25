import { Button } from '@heroui/react'
import React from 'react'

const About = () => {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <img
            src="https://cdn2.cincinnatimagazine.com/wp-content/uploads/sites/5/2024/06/JUL24_Italian_Scottis.jpg"
            alt=""
            className="h-auto max-h-[500px] w-full rounded-2xl object-cover shadow-md"
          />
        </div>

        <div className="">
          <h1 className="mb-4 text-4xl font-semibold text-[#7A2E22]">
            ABOUT US
          </h1>
          <p className="mb-4">
            Experience the essence of Italy in every bite. Our chefs are
            dedicated to bringin you the true taste of Italy, using time-honored
            recipes and
          </p>
          <Button className="rounded-xl bg-[#9E3B2E] px-6 py-2 text-lg font-semibold text-white transition hover:bg-[#7a2e22]">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  )
}

export default About
