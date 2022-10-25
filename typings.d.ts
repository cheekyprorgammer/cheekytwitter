export interface Tweet extends TweetBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _ref: string
    _type: "tweet"
    blockTweet: boolean
}

export type TweetBody = {
    text: string
    username: string
    profileImg: string
    image?: string
}

export interface Comment extends CommentBody {
    _id: string
    _createdAt: string
    _updatedAt: string
    _ref: string
    _type: "comment"
    tweet: {
        _id: string
        _type: "reference"
    }
}

export type CommentBody = {
    comment: string
    tweetId: string
    userName: string
    profileImg: string
}

