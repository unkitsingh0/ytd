const express = require("express");
const cors = require("cors");
const youtubeVideoRoute = require("./routes/youtubeVideoRoute");
const pingRoute = require("./routes/pingRoute");
const PORT = process.env.PORT || 8025;

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/yt", youtubeVideoRoute);
app.use("/api/ping", pingRoute);

app.listen(PORT, () => {
  console.log(`Server started and server is running on port no ${PORT}`);
});
