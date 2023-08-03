let handelPing = (req, res) => {
  res.json({ status: "ok", message: "Ping working" });
};

module.exports = { handelPing };
