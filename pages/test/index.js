
export default function Index(data) {


console.log(data)

  return (
    <div>
test
    </div>
  );
}

export async function getServerSideProps() {

  const res = await fetch('http://localhost:3000/api/test', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json()

  console.log(data)

  return {
    props: {
        data
    }
  }

}
