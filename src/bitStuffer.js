//realiza relleno de bits
const stuff = data => data.replace(/11111/g, '111110'); 
//realiza el desrelleno
const unstuff = data => data.replace(/111110/g, '11111');

module.exports = {
    stuff,
    unstuff
};