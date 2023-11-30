const quoteCtn = document.getElementById("quote-ctn");
const quoteTxt = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote-btn");
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading(){
    loader.hidden = false;
    quoteCtn.hidden = true;
};
// hide loading
function complete(){
    quoteCtn.hidden = false;
    loader.hidden = true;
};

// show new quote
function newQuote( ){
    loading();
    // pick a random quote from API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

// check if author field is blank, if so , put unknown as the author
    if(!quote.author){
        quoteAuthor.textContent = "Unknown"
    } else{
        quoteAuthor.textContent = quote.author;
    }
// check quote length to determine styling
    if(quote.text.length > 20){
        quoteTxt.classList.add('long-quote');
    }else{
        quoteTxt.classList.remove('long-quote');
    }

    // set quote, hide loader
     quoteTxt.textContent = quote.text
    complete();
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
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${quoteAuthor.textContent} `;
    window.open(twitterUrl, "_blank");
}

// event listener

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click' , tweetQuote);

// on load
getQuotes();