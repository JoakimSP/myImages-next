import router from "next/router"

export default function GoBackButton() {
  return (
    <button
  className="inline-flex items-center m-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  onClick={() => router.back()}
>
  Go back
</button>

  )
}
