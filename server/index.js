import express from "express"
import cors from "cors"

import { summaryRoute } from "./routes.js";

const app = express();
app.use(express.json())
app.use(cors())

//Route
app.use(summaryRoute)

app.listen(3333, () => {
  console.log('HTTP Server Running')
})