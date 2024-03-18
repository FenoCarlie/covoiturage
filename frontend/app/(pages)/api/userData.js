import axios from "axios";

export default async function user(req, res) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`);
  const data = response.data;
  res.status(200).json(data);
}
