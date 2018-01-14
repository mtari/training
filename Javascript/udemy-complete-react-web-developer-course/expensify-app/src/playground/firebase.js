import * as firebase from 'firebase';
import moment from 'moment';

const config = {
    apiKey: "AIzaSyDHnlFEs6gX3GJv7MDD83EPy8VHR2Y0heY",
    authDomain: "expensify-98c56.firebaseapp.com",
    databaseURL: "https://expensify-98c56.firebaseio.com",
    projectId: "expensify-98c56",
    storageBucket: "expensify-98c56.appspot.com",
    messagingSenderId: "11328738555"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});


//fetch subscribe
// database.ref('expenses')
// .on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach(childSnapshot => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });  
//     });

//     console.log(expenses);
// });

//fetch once
// database.ref('expenses')
//     .once('value')
//     .then((snapshot) => {
//         const expenses = [];

//         snapshot.forEach(childSnapshot => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });  
//         });

//         console.log(expenses);
//     });

//add
// database.ref('expenses').push({
//     description: 'Water bill',
//     note: '',
//     amount: 4500,
//     createdAt: 0
// });

//add
// database.ref('expenses').push({
//     description: 'Gas bill',
//     note: '',
//     amount: 1000,
//     createdAt: 0
// });

//add
// database.ref('expenses').push({
//     description: 'Coffee',
//     note: '',
//     amount: 100,
//     createdAt: 0
// });






//set data
// database.ref().set({
//     name: "Mihaly Tari",
//     age: 26,
//     isSingle: false,
//     job: 'Software developer',
//     location: {
//         city: "London",
//         country: "United Kindgom"
//     }
// }).then(() => {
//     console.log('Data is saved');
// }).catch((err) => {
//     console.log(err);
// });

// database.ref('age').set(27);

// database.ref('location/city').set("Bermondsey");


//remove data
// database.ref('isSingle').remove();


//update data
// database.ref().update({
//     job: 'Manager',
//     'location/city': 'Boston'
// });


//fetch data
// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((err) => console.log(err));

// database.ref('name')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((err) => console.log(err));

// database.ref('location/city')
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((err) => console.log(err));


//other way to fetch data
// database.ref()
//     .on('value', (snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     });