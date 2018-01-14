const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('SUCCESS');
    }, 1500);
});

promise.then((res) => {
    console.log('res ' + res);
});