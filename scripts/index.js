var firebaseConfig = {
    apiKey: "AIzaSyBq5qcR_nCr4dFRdAFOpOWAT-Awd_OUCyY",
    authDomain: "fitapp-fc363.firebaseapp.com",
    projectId: "fitapp-fc363",
    storageBucket: "fitapp-fc363.appspot.com",
    messagingSenderId: "680007108232",
    appId: "1:680007108232:web:9d6cb7b50fb49a7efdc13d",
    measurementId: "G-ND02BY74XC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
db.collection("data-URLs").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        let newDiv = document.createElement("div");
        const image_element = document.createElement("img");
        image_element.src = doc.data().path;
        image_element.draggable = true;
        newDiv.setAttribute("id", "div" + counter);
        newDiv.setAttribute("ondrop", "drop(event)");
        newDiv.setAttribute("ondragover", "allowDrop(event)");
        newDiv.appendChild(image_element);
        //image
        image_element.setAttribute("id", "drag" + counter);
        image_element.setAttribute("style", "height: 160px;width: 260px;border-radius:15px;");
        image_element.setAttribute("ondragstart", "drag(event)");
        counter++;
        document.getElementsByClassName("footer-container")[0].appendChild(newDiv);
    });
});


const inputElement = document.getElementById("file");
inputElement.addEventListener("change", handleFiles, false);

var counter = 1;
function handleFiles() {
    const file = this.files[0];

    let newDiv = document.createElement("div");
    const image_element = document.createElement("img");
    image_element.file = file;
    image_element.draggable = true;
    newDiv.setAttribute("id", "div" + counter);
    newDiv.setAttribute("ondrop", "drop(event)");
    newDiv.setAttribute("ondragover", "allowDrop(event)");
    newDiv.appendChild(image_element);
    //image
    image_element.setAttribute("id", "drag" + counter);
    image_element.setAttribute("style", "height: 160px;width: 260px;border-radius:15px;");
    image_element.setAttribute("ondragstart", "drag(event)");
    counter++;
    document.getElementsByClassName("footer-container")[0].appendChild(newDiv);
    const reader = new FileReader();
    reader.onload = (function (aImg) {
        return function (e) {
            aImg.src = e.target.result;
            db.collection("data-URLs").add({
                path: aImg.src,
            });
        };
    })(image_element);
    reader.readAsDataURL(file);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


function createOutfit() {
    var image1 = document.getElementsByClassName('drag-div1')[0].getElementsByTagName('img')[0].src;
    var image2 = document.getElementsByClassName('drag-div2')[0].getElementsByTagName('img')[0].src;
    var image3 = document.getElementsByClassName('drag-div3')[0].getElementsByTagName('img')[0].src;

    var c = document.getElementById("output");
    c.width = 260;
    c.height = 480;
    var ctx = c.getContext("2d");
    var imageObj1 = new Image(260, 160);
    var imageObj2 = new Image(260, 160);
    var imageObj3 = new Image(260, 160);
    imageObj1.src = image1;
    imageObj1.onload = function () {
        ctx.drawImage(imageObj1, 0, 0, 260, 160);
        imageObj2.src = image2;
        imageObj2.onload = function () {
            ctx.drawImage(imageObj2, 0, 160, 260, 160);
            imageObj3.src = image3;
            imageObj3.onload = function () {
                ctx.drawImage(imageObj3, 0, 320, 260, 160);
                var img = c.toDataURL("image/png");
                db.collection("outfits").add({
                    path: img,
                });
                //document.write('<img src="' + img + '" width="260" height="480"/>');
            }
        }
    };
    alert("Success!");
}