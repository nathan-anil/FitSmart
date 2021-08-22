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
var currentDay = "";
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();


var elems = document.getElementsByClassName('item-menu');
for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', function (e) {
        for (var j = 0; j < elems.length; j++) {
            elems[j].classList.remove('active');
        }
        e.target.classList.add('active');
        currentDay = e.target.textContent;
        // check if item in db with Monday ect exists:
        // else display: "set outfit"
        var found = false;
        db.collection("days").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.id == currentDay) {
                    document.getElementById('img-output').src = doc.data().path;
                    document.getElementById('select-btn').innerHTML = 'Change';
                    found = true;
                }
            });
        });
        if (!found) {
            document.getElementById('img-output').src = "";
            document.getElementById('select-btn').innerHTML = 'Choose';
        }
    }, false);
}


db.collection("outfits").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "hover");
        const image_element = document.createElement("img");
        image_element.src = doc.data().path;
        image_element.draggable = true;
        newDiv.appendChild(image_element);

        image_element.setAttribute("style", "height: 480px;width: 260px;border-radius:15px;margin: 20px; border: 2px solid gray;");
        newDiv.addEventListener('click', function (e) {
            db.collection("days").doc(currentDay).set({
                path: doc.data().path,
            });
            $('.display-fits, #overlay-back').fadeOut(500);
        }, false);
        document.getElementsByClassName("display-fits")[0].appendChild(newDiv);
    });
});
function showMenu() {
    $('.display-fits, #overlay-back').fadeIn(500);
}
document.body.addEventListener('click', function (e) {
    $('.display-fits, #overlay-back').fadeOut(500);
}, true);