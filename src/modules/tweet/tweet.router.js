import { Router } from "express";
import { create, getAllTweets,pros ,getTweets,getTweetsText,getPositizeTweet} from "./tweet.controllar.js";
const router =Router();
router.get("/",getAllTweets);
router.post("/",create)
router.post('/mongotoEla',pros)
router.get('/getTweets',getTweets)
router.get('/getTweetsText',getTweetsText)
router.get('/getPositizeTweet',getPositizeTweet)
export default router;
