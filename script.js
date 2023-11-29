const quoteCtn = document.getElementById("quote-ctn");
const quoteTxt = document.getElementById("quote");
const quoteAuthoer = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// show new quote
function newQuote( ){
    // pick a random quote from API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

// check if author field is blank, if so , put unknown as the author
    if(!quote.author){
        quoteAuthoer.textContent = "Unknown"
    } else{
        quoteAuthoer.textContent = quote.author;
    }
// check quote length to determine styling
    if(quote.text.length > 80){
        quoteTxt.classList.add('long-quote');
    }else{
        quoteTxt.classList.remove('long-quote');
    }

     quoteTxt.textContent = quote.text
    
}

// going to get quotes from API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
     try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
     } catch(error){
        // cacth error here
     }
}
// tweet quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${quoteAuthoer.textContent} `;
    window.open(twitterUrl, "_blank")
}

// event listener



// on load
getQuotes();