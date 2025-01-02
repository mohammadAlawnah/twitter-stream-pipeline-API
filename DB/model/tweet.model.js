import { Schema,model } from "mongoose";

const tweetSchema = new Schema({
    TweetID: { type: String, required: true, unique: true },
    Tweet: { type: String, required: true },
    Keywords: { type: [String], default: [] },
    Hashtags: { type: [String], default: [] },
    Mentions: { type: [String], default: [] },
    Coordinates: {
        Lat: { type: Number },
        Long: { type: Number }
    },
    Location: { type: String, default: "" },
    Timestamp: { type: Date, required: true },
    Sentiment: { type: String, enum: ['positive', 'negative', 'neutral'], default: 'neutral' }
});

const tweetModel = model('Tweets',tweetSchema);


export default tweetModel;