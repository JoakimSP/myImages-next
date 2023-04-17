import Link from "next/link"
import Header from "@/components/header"

export default function index() {
  return (
    <div>
      <Header></Header>
        <h1>Our photographers</h1>
        <div>
            <Link href="./photographers/kim">Kim</Link>
        </div>
        <div>
            <Link href="#">test</Link>
        </div>
    </div>
  )
}
