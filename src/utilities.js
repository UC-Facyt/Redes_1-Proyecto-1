Array.range = function(n) {
  return Array.apply(null,Array(n)).map((x,i) => i)
};

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(n) {
    return Array.range(Math.ceil(this.length/n)).map((x,i) => this.slice(i*n,i*n+n));
  }
});

if (!String.prototype.leftPad) {
	String.prototype.leftPad = function (length, str) {
		if (this.length >= length) {
			return this;
		}
		str = str || ' ';
		return (new Array(Math.ceil((length - this.length) / str.length) + 1).join(str)).substr(0, (length - this.length)) + this;
	};
}
