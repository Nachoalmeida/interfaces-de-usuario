"use strict";

const btnChatsOn = document.getElementById("btnChatsOn");
const listChats = document.getElementById("listChats");

if (btnChatsOn) {
    btnChatsOn.addEventListener('click', () => {
        if (listChats.classList.contains('list-chats-off')) {
            listChats.classList.remove('list-chats-off');
            listChats.classList.add('list-chats-on');
        } else {
            listChats.classList.add('list-chats-off');
            listChats.classList.remove('list-chats-on');
        }
    });
}

const chat1 = document.getElementById("chat1-1");
const onChat1 = document.getElementById("onChat1");
const onChat2 = document.getElementById("onChat2");
const btnCloseChat = document.getElementById("btnCloseChat");

if (onChat1) {
    onChat1.addEventListener('click', () => onchat());
}

if (onChat2) {
    onChat2.addEventListener('click', () => onchat());
}

if (btnCloseChat) {
    btnCloseChat.addEventListener('click', () => {
        offchat();
    });
}

function onchat() {
    chat1.classList.remove('chat-1-off');
    chat1.classList.add('chat-1-on');
}

function offchat() {
    chat1.classList.remove('chat-1-on');
    chat1.classList.add('chat-1-off');
}


const boxcomment1 = document.getElementById("boxcomment1");
const post1comment = document.getElementById("post1comment").addEventListener('click', () => onComment());

const boxcomment2 = document.getElementById("boxcomment2");
const post2comment = document.getElementById("post2comment").addEventListener('click', () => onComment2());

const boxcomment3 = document.getElementById("boxcomment3");
const post3comment = document.getElementById("post3comment").addEventListener('click', () => onComment3());

function onComment3() {
    if (boxcomment3.classList.contains('box-comment-off')) {
        boxcomment3.classList.remove('box-comment-off');
        boxcomment3.classList.add('box-comment-on');
    } else {
        boxcomment3.classList.add('box-comment-off');
        boxcomment3.classList.remove('box-comment-on');
    }
}

function onComment2() {
    if (boxcomment2.classList.contains('box-comment-off')) {
        boxcomment2.classList.remove('box-comment-off');
        boxcomment2.classList.add('box-comment-on');
    } else {
        boxcomment2.classList.add('box-comment-off');
        boxcomment2.classList.remove('box-comment-on');
    }
}


function onComment() {
    if (boxcomment1.classList.contains('box-comment-off')) {
        boxcomment1.classList.remove('box-comment-off');
        boxcomment1.classList.add('box-comment-on');
    } else {
        boxcomment1.classList.add('box-comment-off');
        boxcomment1.classList.remove('box-comment-on');
    }
}

const boxPost = document.getElementById("boxPost");
const loadingPost = document.getElementById("loadingPost");

setTimeout(() => {
    if (boxPost) {
        boxPostOn();
    }
}, 2000);

function boxPostOn() {
    boxPost.classList.remove('invisible');
    boxPost.classList.add('visible');
    loadingPost.classList.add('d-none');
}

const contributesPost = document.getElementById("contributesPost");
const loadingContributesPost = document.getElementById("loadingContributesPost");

setTimeout(() => {
    if (contributesPost) {
        boxContributesPostOn();
    }
}, 1500);

function boxContributesPostOn() {
    contributesPost.classList.remove('invisible');
    contributesPost.classList.add('visible');
    loadingContributesPost.classList.add('d-none');
}

const suggestions = document.getElementById("suggestions");
const loadingSuggestions = document.getElementById("loadingSuggestions");

setTimeout(() => {
    if (suggestions) {
        boxSuggestionsPostOn();
    }
}, 1700);

function boxSuggestionsPostOn() {
    suggestions.classList.remove('invisible');
    suggestions.classList.add('visible');
    loadingSuggestions.classList.add('d-none');
}

const ads = document.getElementById("ads");
const loadingaAds = document.getElementById("loadingaAds");

setTimeout(() => {
    if (ads) {
        boxAdsPostOn();
    }
}, 1900);

function boxAdsPostOn() {
    ads.classList.remove('invisible');
    ads.classList.add('visible');
    loadingaAds.classList.add('d-none');
}

const face = document.getElementById("face");
const loadingFace = document.getElementById("loadingFace");

setTimeout(() => {
    if (face) {
        boxFacePostOn();
    }
}, 1300);

function boxFacePostOn() {
    face.classList.remove('invisible');
    face.classList.add('visible');
    loadingFace.classList.add('d-none');
}

const interests = document.getElementById("interests");
const loadingInterests = document.getElementById("loadingInterests");

setTimeout(() => {
    if (interests) {
        boxInterestsPostOn();
    }
}, 1000);

function boxInterestsPostOn() {
    interests.classList.remove('invisible');
    interests.classList.add('visible');
    loadingInterests.classList.add('d-none');
}


const followed = document.getElementById("followed");
const loadingFollowed = document.getElementById("loadingFollowed");

setTimeout(() => {
    if (followed) {
        boxFollowedPostOn();
    }
}, 1500);

function boxFollowedPostOn() {
    followed.classList.remove('invisible');
    followed.classList.add('visible');
    loadingFollowed.classList.add('d-none');
}

const pefil = document.getElementById("pefil");
const loadingpefil = document.getElementById("loadingpefil");

setTimeout(() => {
    if (pefil) {
        boxFefilPostOn();
    }
}, 1500);

function boxFefilPostOn() {
    pefil.classList.remove('invisible');
    pefil.classList.add('visible');
    loadingpefil.classList.add('d-none');
}

const contacts = document.getElementById("contacts");
const loadingcontacts = document.getElementById("loadingcontacts");

setTimeout(() => {
    if (contacts) {
        boxContactsPostOn();
    }
}, 1300);

function boxContactsPostOn() {
    contacts.classList.remove('invisible');
    contacts.classList.add('visible');
    loadingcontacts.classList.add('d-none');
}

const persons = document.getElementById("persons");
const loadingPersons = document.getElementById("loadingPersons");

setTimeout(() => {
    if (persons) {
        boxPersonsPostOn();
    }
}, 1300);

function boxPersonsPostOn() {
    persons.classList.remove('invisible');
    persons.classList.add('visible');
    loadingPersons.classList.add('d-none');
}


const search = document.getElementById('search');

if (search) {
    search.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            window.location = "../TP5/search.html";
        }
    });
}

const btnLike = document.getElementById('btnLike');
const likes = document.getElementById('likes');
let like = null;

if (likes) {
    btnLike.addEventListener('click', () => {
        if(like === 0 || like === null){
            if(like === 0){
                dislikes.innerText = Number(dislikes.innerText) - 1;
                btnDislike.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                                    </svg> <span id="dislikes" value="${dislikes.innerText}">${dislikes.innerText}</span>`
            }
            likes.innerText = Number(likes.innerText) + 1;
            btnLike.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                </svg> <span id="likes" value="${likes.innerText}">${likes.innerText}</span>`
            like = 1;
        }
    });
}

const btnDislike = document.getElementById('btnDislike');
const dislikes = document.getElementById('dislikes');

if (dislikes) {
    btnDislike.addEventListener('click', () => {
        if(like === 1 || like === null){
            if(like === 1){
                likes.innerText = Number(likes.innerText) - 1;
                btnLike.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                    </svg> <span id="likes" value="${likes.innerText}">${likes.innerText}</span>`
            }
            dislikes.innerText = Number(dislikes.innerText) + 1;
            btnDislike.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                                    <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                                </svg> <span id="dislikes" value="${dislikes.innerText}">${dislikes.innerText}</span>`
            like = 0;
        }
    });
}