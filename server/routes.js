import { Router } from "express";
import { convert } from "./convert.js";
import { download } from "./download.js";
import { transcribe } from "./transcribe.js";
import { summarize } from "./summarize.js";

const summaryRoute = Router();

summaryRoute.get("/summary/:id", async (request, response) => {
  try {
    const videoId = request.params.id;
    await download(videoId);
    const audioConverted = await convert();
    const result = await transcribe(audioConverted);

    response.json({ result });
  } catch (error) {
    console.log('[ERROR_ROUTE_SUMMARY_ID]', error)
    return response.json({ error });
  }
});

summaryRoute.post("/summary", async (req, res) => {
  try {
    const result = await summarize(req.body.text);
    return res.json({ result });
  } catch(error) {
    console.log('[ERROR_ROUTE_SUMMARY]', error)
    return res.json({ error })
  }
});

export { summaryRoute };
