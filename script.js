const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('item-container');
const modalInside = document.getElementById('modal-inside');

let bookmarks=[];

// add class to show modal
function showModal (){
    modal.classList.remove('close-modal')
    modal.classList.add('show-modal');
    websiteNameEl.focus();   
}


modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click',()=>{
    modal.classList.add('close-modal');
    setTimeout(function () {
    modal.classList.remove('show-modal');}, 680)
})
window.addEventListener('click', (e) => {
    if (e.target===modal){
        modal.classList.add('close-modal');
        setTimeout(function () {
        modal.classList.remove('show-modal');}, 680)
    }
})

// try to check the url to see if it is valid or not using regex
function validate(name,urlValue){
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    var regex = new RegExp(expression);
    if (!name || !urlValue){
        alert("Please fill up both inputs");
        return false;
    }
    if (!urlValue.match(regex)) {
        alert("Please Provide a Valid URL");
        return false;
    }
    return true; 
}

// adding the added bookmarks to the main page
function buildBookmarks(){
    bookmarksContainer.textContent='';
    bookmarks.forEach((bookmark) => {
        console.log(bookmark);
        const {name,url}=bookmark;
        const items = document.createElement('div');
        items.classList.add('items');

        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-regular','fa-circle-xmark');
        closeIcon.setAttribute('title','Delete Bookmark');
        closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
        
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');

        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);

        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank');
        link.textContent=name;

        linkInfo.append(favicon,link);

        items.append(closeIcon,linkInfo);

        bookmarksContainer.append(items);
    });
}

// fetching the bookmarks from the local storage
function fetchbookmarks(){
    if(localStorage.getItem('bookmarks')){
        bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    }
    else{
        bookmarks = [
            {
                name: 'Pouria Pourrashidi',
                url: 'https://pouriapourrashidi.herokuapp.com/index.html',
            }
        ]
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    buildBookmarks();
}

// delete bookmarks in clicking the remove button
function deleteBookmark(url){
    // console.log(url);

    bookmarks.forEach((bookmark,i) => {
        if (bookmark.url===url){
            bookmarks.splice(i,1);
        }
    });
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    buildBookmarks();
}

// storing the entered bookmarks in the localstorage
function storeBookmark(e){
    e.preventDefault();
    // console.log(e); 
    const nameurl = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
     urlValue = `https://${urlValue}`; 
    }
    if(!validate(nameurl,urlValue)){
        return false;
    }
    bookmark={
        name:nameurl,
        url:urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchbookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

bookmarkForm.addEventListener('submit', storeBookmark);


fetchbookmarks();