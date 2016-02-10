module.exports = function (a, b) {
    return new Promise(function (r) {
        setTimeout(function (){
            r(a + b);
        }, 30);
    });
};
