const express = require("express");
const app = express();
const port = 3000;
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const firebaseConfig = {
	apiKey: "AIzaSyBAwmNk8Ch2KWM0havXYLvpFwJSlxGSVNA",
	authDomain: "hanasu-2.firebaseapp.com",
	projectId: "hanasu-2",
	storageBucket: "hanasu-2.appspot.com",
	messagingSenderId: "245069176356",
	appId: "1:245069176356:web:4e04f966f93730898a42b1"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
app.use(express.json());

app.post("/signin", (req, res) => {
	firebase
		.auth()
		.signInWithEmailAndPassword(req.body.email, req.body.password)
		.then((result) => {
			res.send({
				uid: result.user.uid,
				loggedIn: true
			});
		})
		.catch((error) => {
			console.error(error.message);
			res.send(error.message);
		});
});

app.post("/signup", (req, res) => {
	firebase
		.auth()
		.createUserWithEmailAndPassword(req.body.email, req.body.password)
		.then((result) => {
			db.collection("Users").doc(result.user.uid).set({
				email: req.body.email,
				username: req.body.username,
				target_language: req.body.target_language,
				proficient_language: req.body.proficient_language
			});
			res.send({
				uid: result.user.uid,
				loggedIn: true
			});
		})
		.catch((error) => {
			console.error(error.message);
			res.send(error.message);
		});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});
