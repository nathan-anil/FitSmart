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

var elems = document.getElementsByTagName('li');
for (var i = 0; i < elems.length; ++i) {
    elems[i].addEventListener('click', function (elem) {
        for (var j = 0; j < elems.length; j++) {
            elems[j].classList.remove('active');
        }
        document.getElementById("title").innerHTML = "August " + elem.target.innerHTML;
        elem.target.classList.add('active');
        // set image
        var num = parseInt(elem.target.innerHTML);
        while (num > 7) { num -= 7; }
        var day = "";
        switch (num) {
            case 1:
                day = 'Sunday';
                break;
            case 2:
                day = 'Monday';
                break;
            case 3:
                day = 'Tuesday';
                break;
            case 4:
                day = 'Wednesday';
                break;
            case 5:
                day = 'Thuresday';
                break;
            case 6:
                day = 'Friday';
                break;
            case 7:
                day = 'Saturday';
                break;
        }
        var found = false;
        db.collection("days").get().then((querySnapshot) => {
            console.log('in');
            querySnapshot.forEach((doc) => {
                var str = JSON.stringify(doc.id);
                if (str.includes(day)) {
                    document.getElementById('img-output').src = doc.data().path;
                    document.getElementById('img-output').style.display = "block";
                    document.getElementById('error').style.display = "none";
                    found = true;
                }
            });
        });
        if (!found) {
            document.getElementById('img-output').style.display = "none";
            document.getElementById('error').style.display = "block";
        }
    }, true);
}
var winHeight = $(window).height();
var height = (winHeight * 16.6666) / 290;
var lineHeight = height + "px";

$("li").css("line-height", lineHeight);
$("li").css("height", height);