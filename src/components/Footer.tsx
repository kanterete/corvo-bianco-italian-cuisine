import { Button, Form } from '@heroui/react'
import React from 'react'

const Footer = () => {
  return (
    <footer
      id="contact"
      className="flex w-full justify-center bg-[#4B2C20] px-4 py-16 lg:px-32"
    >
      <div className="container flex flex-col justify-between gap-16 align-middle md:flex-row md:items-baseline md:gap-2">
        <div className="max-w-xs text-white">
          <h3 className="mb-4 text-2xl font-bold">Corvo Bianco</h3>
          <p className="mb-4">
            Subscribe to get the latest updates on new menu items, special
            offers, and exclusive deals.
          </p>
          <Form className="w-full">
            <label htmlFor="name" className="mb-2 text-lg font-semibold">
              Name
            </label>

            <input
              name="name"
              placeholder="Enter your name"
              type="text"
              className="mb-4 rounded-xl border-1 p-1"
            />

            <label htmlFor="mail" className="mb-2 text-lg font-semibold">
              Mail
            </label>

            <input
              name="mail"
              placeholder="Enter your mail"
              type="mail"
              className="mb-4 rounded-xl border-1 p-1"
            />

            <Button
              type="submit"
              variant="bordered"
              className="rounded-xl bg-[#D4A373] px-6 py-2 font-semibold transition hover:bg-[#c6925d]"
            >
              Submit
            </Button>
          </Form>
        </div>

        <div className="text-white">
          <h3 className="mb-6 text-lg font-semibold">Map site</h3>
          <ul className="ml-3">
            <li className="mb-4 hover:underline">Home</li>
            <li className="mb-4 hover:underline">Shop</li>
            <li className="hover:underline">Contact</li>
          </ul>
        </div>

        <div className="text-white">
          <h3 className="mb-6 text-lg font-semibold">Customer zone</h3>
          <ul className="ml-3">
            <li className="mb-4 hover:underline">Delivery & Payment</li>
            <li className="mb-4 hover:underline">Returns & Complaints</li>
            <li className="mb-4 hover:underline">Terms and Conditions</li>
            <li className="mb-4 hover:underline">FAQ</li>
            <li className="hover:underline">Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
