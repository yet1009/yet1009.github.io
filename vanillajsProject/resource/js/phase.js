const phase = [

    {
        author: "Empire Records",
        sentence:  "I don't regret the things I've done, but those I did not do"
    },
    {
        author: "Snow White",
        sentence:  "Remember you’re the one who can fill the world with sunshine."
    },
    {
        author: "HERCULES",
        sentence:  "A true hero isn’t measured by the size of his strength, but by the strength of his heart."
    },
    {
        author: "Cinderella",
        sentence:  "Magic can happen only when you have an earnest desire."
    },
    {
        author: "Beauty and the Beast",
        sentence:  "To love someone, you have to love yourself first."
    },
    {
        author: "Aladin",
        sentence:  "The special moments of today are memories of tomorrow."
    },
    {
        author: "Mulan",
        sentence:  "The flower that bloom after overcoming adversity are the most beautiful flower."
    },
    {
        author: "Zootopia",
        sentence:  "Anyone can be anything. Nobody can say to me what I should do or not with my dreams!"
    },
    {
        author: "Peter Pan",
        sentence:  "You still have enough time to make your dreams come true!"
    },
    {
        author: "Dumbo",
        sentence:  "Every day, every minute, every second, you have a chance to change your life."
    },


]

const _phrase =  document.querySelector('.phrase_wrap');
const sentenece = _phrase.querySelector('.sentence');
const author = _phrase.querySelector('.author');
const randNum = Math.floor(Math.random() * phase.length);

sentenece.textContent = phase[randNum].sentence;
author.textContent = "-" + phase[randNum].author;