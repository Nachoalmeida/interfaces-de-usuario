"use strict";

const btnChatsOn = document.getElementById("btnChatsOn");
const listChats = document.getElementById("listChats");

btnChatsOn.addEventListener('click', () => {
    if(listChats.classList.contains('list-chats-off')){
        listChats.classList.remove('list-chats-off');
        listChats.classList.add('list-chats-on');
    }else{
        listChats.classList.add('list-chats-off');
        listChats.classList.remove('list-chats-on');
    }
});

const chat1 = document.getElementById("chat1-1");
const onChat1 = document.getElementById("onChat1").addEventListener('click', ()=>onchat());
const onChat2 = document.getElementById("onChat2").addEventListener('click', ()=>onchat());;
const btnCloseChat = document.getElementById("btnCloseChat");


btnCloseChat.addEventListener('click', () => {
    offchat();
});

function onchat(){
    chat1.classList.remove('chat-1-off');
    chat1.classList.add('chat-1-on');
}

function offchat(){
    chat1.classList.remove('chat-1-on');
    chat1.classList.add('chat-1-off');
}


const boxcomment1 = document.getElementById("boxcomment1");
const post1comment = document.getElementById("post1comment").addEventListener('click', ()=>onComment());

const boxcomment2 = document.getElementById("boxcomment2");
const post2comment = document.getElementById("post2comment").addEventListener('click', ()=>onComment2());

const boxcomment3 = document.getElementById("boxcomment3");
const post3comment = document.getElementById("post3comment").addEventListener('click', ()=>onComment3());

function onComment3(){
    if(boxcomment3.classList.contains('box-comment-off')){
        boxcomment3.classList.remove('box-comment-off');
        boxcomment3.classList.add('box-comment-on');
    }else{
        boxcomment3.classList.add('box-comment-off');
        boxcomment3.classList.remove('box-comment-on');
    }
}

function onComment2(){
    if(boxcomment2.classList.contains('box-comment-off')){
        boxcomment2.classList.remove('box-comment-off');
        boxcomment2.classList.add('box-comment-on');
    }else{
        boxcomment2.classList.add('box-comment-off');
        boxcomment2.classList.remove('box-comment-on');
    }
}


function onComment(){
    if(boxcomment1.classList.contains('box-comment-off')){
        boxcomment1.classList.remove('box-comment-off');
        boxcomment1.classList.add('box-comment-on');
    }else{
        boxcomment1.classList.add('box-comment-off');
        boxcomment1.classList.remove('box-comment-on');
    }
}

const boxPost = document.getElementById("boxPost");
const loadingPost = document.getElementById("loadingPost");

setTimeout(() => {
    if(boxPost){
        boxPostOn();
    }
}, 2000);

function boxPostOn(){
    boxPost.classList.remove('invisible');
    boxPost.classList.add('visible');
    loadingPost.classList.add('d-none');
}

const contributesPost = document.getElementById("contributesPost");
const loadingContributesPost = document.getElementById("loadingContributesPost");

setTimeout(() => {
    if(contributesPost){
        boxContributesPostOn();
    }
}, 1500);

function boxContributesPostOn(){
    contributesPost.classList.remove('invisible');
    contributesPost.classList.add('visible');
    loadingContributesPost.classList.add('d-none');
}

const suggestions = document.getElementById("suggestions");
const loadingSuggestions = document.getElementById("loadingSuggestions");

setTimeout(() => {
    if(suggestions){
        boxSuggestionsPostOn();
    }
}, 1700);

function boxSuggestionsPostOn(){
    suggestions.classList.remove('invisible');
    suggestions.classList.add('visible');
    loadingSuggestions.classList.add('d-none');
}

const ads = document.getElementById("ads");
const loadingaAds = document.getElementById("loadingaAds");

setTimeout(() => {
    if(ads){
        boxAdsPostOn();
    }
}, 1900);

function boxAdsPostOn(){
    ads.classList.remove('invisible');
    ads.classList.add('visible');
    loadingaAds.classList.add('d-none');
}

const face = document.getElementById("face");
const loadingFace = document.getElementById("loadingFace");

setTimeout(() => {
    if(face){
        boxFacePostOn();
    }
}, 1300);

function boxFacePostOn(){
    face.classList.remove('invisible');
    face.classList.add('visible');
    loadingFace.classList.add('d-none');
}

const interests = document.getElementById("interests");
const loadingInterests = document.getElementById("loadingInterests");

setTimeout(() => {
    if(interests){
        boxInterestsPostOn();
    }
}, 1000);

function boxInterestsPostOn(){
    interests.classList.remove('invisible');
    interests.classList.add('visible');
    loadingInterests.classList.add('d-none');
}


const followed = document.getElementById("followed");
const loadingFollowed = document.getElementById("loadingFollowed");

setTimeout(() => {
    if(followed){
        boxFollowedPostOn();
    }
}, 1500);

function boxFollowedPostOn(){
    followed.classList.remove('invisible');
    followed.classList.add('visible');
    loadingFollowed.classList.add('d-none');
}

const pefil = document.getElementById("pefil");
const loadingpefil = document.getElementById("loadingpefil");

setTimeout(() => {
    if(pefil){
        boxFefilPostOn();
    }
}, 1500);

function boxFefilPostOn(){
    pefil.classList.remove('invisible');
    pefil.classList.add('visible');
    loadingpefil.classList.add('d-none');
}

const contacts = document.getElementById("contacts");
const loadingcontacts = document.getElementById("loadingcontacts");

setTimeout(() => {
    if(contacts){
        boxContactsPostOn();
    }
}, 1300);

function boxContactsPostOn(){
    contacts.classList.remove('invisible');
    contacts.classList.add('visible');
    loadingcontacts.classList.add('d-none');
}