import axios from "axios"


/* let url= */
export default async function test() {

let test = await axios.get("http://localhost:3000/")

console.log(test.data.message)

}
