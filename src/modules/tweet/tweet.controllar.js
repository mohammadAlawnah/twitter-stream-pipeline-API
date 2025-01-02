import tweetModel from "../../../DB/model/tweet.model.js";

export const getAllTweets = async (req, res) => {
    const tweet = await tweetModel.find({});
    return res.status(200).json({ message: 'Success', tweet });
};

export const create = async (req, res) => {
    try {
        const {
            TweetID,
            Tweet,
            Keywords,
            Hashtags,
            Mentions,
            Coordinates,
            Location,
            Timestamp,
            Sentiment
        } = req.body;


        const newTweet = new tweetModel({
            TweetID,
            Tweet,
            Keywords,
            Hashtags,
            Mentions,
            Coordinates,
            Location,
            Timestamp,
            Sentiment
        });

        await newTweet.save();

        res.status(201).json({
            message: "Done",
            data: newTweet
        });
    } catch (error) {
        res.status(500).json({
            message: "error",
            error: error.message
        });
    }
};

export const getTweetsText = async(req,res)=>{
    const {text} = req.body;
    const tweets = await tweetModel.find({
        Tweet: { $regex: `\\b${text}\\b`, $options: "i" }
    });
    return res.json(tweets)
}
export const getPositizeTweet = async(req,res)=>{

    const tweets = await tweetModel.find({ Sentiment: "positive" }).select('_id');
    res.json(tweets);
}


/*
export const getUrlTweets = async(req,res)=>{

}
*/


/*

export const get
*/






import bodyParser from 'body-parser';

  
// إنشاء Endpoint لحفظ التغريدة في Elasticsearch

/*
app.post('/store-tweet', async (req, res) => {
  try {
    const tweetData = req.body;

    if (!tweetData.TweetID || !tweetData.Tweet) {
      return res.status(400).json({ error: 'TweetID and Tweet are required' });
    }

    const response = await client.index({
      index: 'tweets',
      id: tweetData.TweetID,
      document: tweetData,
    });

    res.status(200).json({ message: 'Tweet stored successfully', result: response });
  } catch (error) {
    console.error('Error storing tweet:', error);
    res.status(500).json({ error: 'Failed to store tweet' });
  }
});
*/
import { client } from "../../../index.js";

export const pros = async (req, res) => {
    try {
        const tweets = await tweetModel.find().lean();

        // Remove `_id` field from each document
        const body = tweets.flatMap(doc => {
            const { _id, ...docWithoutId } = doc;
            return [
                { index: { _index: 'tweets', _id: _id.toString() } },
                docWithoutId
            ];
        });

        const bulkResponse = await client.bulk({ refresh: true, body });

        if (bulkResponse.errors) {
            const erroredDocuments = bulkResponse.items.filter(item => item.index && item.index.error);

            console.log('Bulk operation errors:', erroredDocuments);
            return res.status(500).json({
                error: 'Error during bulk indexing',
                details: erroredDocuments
            });
        }

        res.status(200).json({ message: 'Tweets stored successfully in Elasticsearch', result: bulkResponse });
    } catch (error) {
        console.error('Error storing tweets:', error);
        res.status(500).json({ error: 'Failed to store tweets' });
    }
};

export const getTweets = async (req, res) => {
    try {
        // استخراج المعلمات (اختياري، مثل البحث بالكلمات المفتاحية أو التصفية)
        const { keyword } = req.query;

        // بناء طلب البحث
        const searchQuery = {
            index: 'tweets',
            body: {
                query: {
                    match_all: {} // يسترجع جميع المستندات
                }
            }
        };

        // إذا تم توفير كلمة مفتاحية، نستخدمها في البحث
        if (keyword) {
            searchQuery.body.query = {
                match: {
                    text: keyword // `text` هو الحقل الذي يحتوي على المحتوى. يمكنك تغييره حسب البنية.
                }
            };
        }

        // تنفيذ البحث
        const { hits } = await client.search(searchQuery);

        // إعادة البيانات
        res.status(200).json({
            message: 'Tweets fetched successfully',
            data: hits.hits.map(hit => ({
                id: hit._id,
                ...hit._source
            }))
        });
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Failed to fetch tweets' });
    }
};


  
/*
app.post('/mongo-to-elasti',async(req,res)=>{
})
    */