export default async function (req, res) {
  try {
    const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
    res.end(JSON.stringify({ IPv4: ip }));
  } catch (error) {
    res.json(error);
    res.status(405).end();
  }
}
