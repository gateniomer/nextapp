import Link from "next/link"
import Cart from "./Cart"

export default function Nav () {
  return (
  <div>
    <Link href={'/'}>Home</Link>
    <Cart/>
  </div>
  )
}