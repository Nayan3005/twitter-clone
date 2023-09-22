import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const feed = document.getElementById('feed')

// tweetBtn.addEventListener('click', function(){
//     console.log(tweetInput.value)
// })

document.addEventListener('click',function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick() 
    }
})

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]   //[0] will give the first element of array that is an object

    if(targetTweetObj.isLiked===true){
        targetTweetObj.likes--
    }else{
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked =!targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]   //[0] will give the first element of array that is an object

    if(targetTweetObj.isRetweeted===true){
        targetTweetObj.retweets--
    }else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted =!targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')

}

function handleTweetBtnClick(){ 
    const tweetInput = document.getElementById('tweet-input') 
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value=""
}}

function getFeedHtml(){
    let feedHtml = ''
    tweetsData.forEach(function(tweet){

        let likeIconClass = ""
        if(tweet.isLiked){
            likeIconClass = 'liked'
        }

        let retweetIconClass = ""
        if(tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''

        if(tweet.replies.length>0){
            for(let reply of tweet.replies){
                repliesHtml += 
                `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `
            }
        }

        feedHtml += 
        `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                            <i 
                                class="fa-regular fa-comment-dots" 
                                data-reply="${tweet.uuid}">
                            </i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                            <i 
                                class="fa-solid fa-heart ${likeIconClass}" 
                                data-like="${tweet.uuid}">
                            </i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail"">
                            <i 
                                class="fa-solid   fa-retweet ${retweetIconClass}" 
                                data-retweet="${tweet.uuid}">
                            </i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
                <textarea id="reply-${tweet.uuid}" placeholder="Reply to ${tweet.handle}"></textarea>
                <button id="reply-btn">Reply</button>
         </div> 
        </div>
        `
    })
    return feedHtml
}

function render(){
    feed.innerHTML=getFeedHtml()
}

render()


//My way of writing the function
/*
function handleLikeClick(tweetId){
    let targetTweetObj = {}
    for(let tweet of tweetsData){
        if(tweet.uuid === tweetId){
            targetTweetObj = tweet
        }
    }
    targetTweetObj.likes +=1
    console.log(targetTweetObj)
}
*/