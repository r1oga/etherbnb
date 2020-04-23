export default (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end() // METHOD not allowed
    return
  }
  console.log('POST request received')
}
