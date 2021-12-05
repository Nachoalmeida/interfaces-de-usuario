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

