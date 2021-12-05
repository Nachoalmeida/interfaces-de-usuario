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
