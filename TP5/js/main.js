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