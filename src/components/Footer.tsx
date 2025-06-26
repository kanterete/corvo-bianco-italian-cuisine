import { Button, Form, Input } from '@heroui/react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex w-full justify-center bg-white px-4 py-16 lg:px-32">
      <div className="container flex flex-col items-center justify-between gap-16 align-middle md:flex-row md:items-baseline md:gap-2">
        <div className="max-w-xs">
          <h3 className="mb-4 text-2xl font-bold text-[#7A2E22]">
            Corvo Bianco
          </h3>
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
              className="rounded-xl bg-[#9E3B2E] px-6 py-2 font-semibold text-white transition hover:bg-[#7a2e22]"
            >
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold">Map site</h3>
          <ul>
            <li className="mb-4 hover:underline">Home</li>
            <li className="mb-4 hover:underline">Shop</li>
            <li className="hover:underline">Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-semibold">Customer zone</h3>
          <ul>
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
