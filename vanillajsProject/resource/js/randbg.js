
function bgRandomChange() {
    
    const _bgBox = document.querySelector('.bgbox') 
    const bgCollect = ['01','02','03','04','05'];
    const randPics = Math.floor(Math.random() * bgCollect.length);


    _bgBox.style.background = `url('../resource/img/bg${bgCollect[randPics]}.jpg') no-repeat center`;
    _bgBox.style.backgroundSize = "cover";

}

window.addEventListener('load', bgRandomChange);