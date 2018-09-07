const customModal = document.querySelector('#custom-modal');
const customLoader = document.querySelector('#custom-loader');
const sideNav = document.querySelector('#side-nav');
let imageArr64;


function routeToDetails(id){
    console.log(id);
}

function previewImages(){
    imageArr64 = [];
    const fileEl = document.querySelector('#file');
    const files = fileEl.files;
    const previewImagesEl = document.querySelector('#preview-images');
    previewImagesEl.innerHTML = '';
    for(let i=0; i<files.length; i++){
        let reader  = new FileReader();
        reader.addEventListener("load",function () {
              imageArr64.push(reader.result)
              if(imageArr64.length === files.length){
                  imageArr64.forEach(image => {
                      previewImagesEl.innerHTML += `
                        <div class="preview-image" style="background-image: url('${image}')"></div>
                      `
                  })
              }
            }, false);
            if (files) {
                reader.readAsDataURL(files[i]);
            }
    }
}
function sendFile() {
    const categoryEl = document.querySelector('#category');
    const nameEl = document.querySelector('#name');
    const descriptionEl = document.querySelector('#description');
    const locationEl = document.querySelector('#location');
    const priceEl = document.querySelector('#price');
    const data = { 
        category: categoryEl.value, 
        name:nameEl.value, 
        description:descriptionEl.value,
        location:locationEl.value,
        price:priceEl.value,
        images: imageArr64,
    };
    fetch('/upload',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
      .then(res => console.log(res))

    return false;
}
function createUser(){
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');  
    
    if(
        username.value.trim().length < 1 || 
        email.value.trim().length < 1 ||
        password.value.trim().length < 1
    ){
        console.log("Please fill all the fields");
        showModal('Please fill all the fields','modal-failure');
        return false;
    }
    showLoader('Creating account...');
    const data = {
        username: username.value,
        email: email.value,
        password: password.value        
    }
    fetch('/auth/signup',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then(res => {
            return res.json()
        })
        .then(json => {
            if(json.isError){
                throw json
            }
            console.log(json);
            hideLoader();
            showModal('Successfull','modal-success');            
            location.assign('/');
        })
        .catch(err => {
            console.log(err);
            hideLoader();
            showModal(err.message,'modal-failure');
        })
    return false;
}
function login(){
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    if(
        username.value.trim().length < 1 || 
        password.value.trim().length < 1
    ){
        console.log("Please fill all the fields");
        showModal('Please fill all the fields','modal-failure');
        return false;
    }
    showLoader('Logging in...');
    const data = {
        username: username.value,
        password: password.value        
    }
    fetch('/auth/login',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then(res => {
            return res.json()
        })
        .then(json => {
            if(json.isError){
                throw json
            }
            console.log(json);
            hideLoader();
            location.assign('/');            
        })
        .catch(err => {
            console.log(err);
            hideLoader();
            showModal(err.message,'modal-failure');
        })
    return false;
}


function showNav(text,mode){
    sideNav.style.display = 'block';
    setTimeout(()=>{
        sideNav.style.transform = 'translateX(0px)';
    },100)
}

function hideNav(){
    sideNav.style.transform = 'translateX(-575px)';
    setTimeout(()=>{
        sideNav.style.display = 'none';
    },1000)
}

function showModal(text,mode){
    customModal.innerText = text;
    customModal.className = mode;
    customModal.style.display = 'flex';
    setTimeout(()=>{
        customModal.style.opacity = '1';
        customModal.style.transform = 'translateY(0px)';
    },10);
    setTimeout(hideModal,3000)
}

function hideModal(){
    customModal.style.opacity = '0';
    customModal.style.transform = 'translateY(100px)';
    setTimeout(()=>{
        customModal.style.display = 'none';
    },500)
}


function showLoader(text){
    customLoader.innerText = text;
    customLoader.style.display = 'flex';
    setTimeout(()=>{
        customLoader.style.opacity = '1';
        customLoader.style.transform = 'translateY(0px)';
    },10)
}


function hideLoader(){
    customLoader.style.opacity = '0';
    customLoader.style.transform = 'translateY(100px)';
    setTimeout(()=>{
        customLoader.style.display = 'none';
    },500)
}