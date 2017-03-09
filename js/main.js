const fs = require('fs');
let currentType = 'hamming';

function readFile(path) {
  return fs.readFileSync(path).toString();
}

angular
	.module("HammingApp", [])
	.controller("ErrorsCtrl", ErrorsController);


function ErrorsController() {
	let vm = this;

	vm.errors = [];

	vm.addError = function() {
		const index = vm.errors.push({ error: "Nice error", }) - 1;
		setTimeout(() => {
			console.log(`searching #error-${index}`);
			document
				.querySelector(`#error-${index}`)
				.classList
				.remove('scale-out');
		}, 400);
	};

	vm.addError();
	vm.addError();
	vm.addError();
	vm.addError();

}

const fileDragContainer = document.querySelector('.file-drop');

fileDragContainer.ondragover = () => false;
fileDragContainer.ondragleave = () => false;
fileDragContainer.ondragend = () => false;
fileDragContainer.ondrop = (e) => {
	e.preventDefault();

	for (let f of e.dataTransfer.files) {
		let content = readFile(f.path);
		console.log(content);
	}

	return false;
};

function changeType(checked) {
  currentType = checked ? 'hamming' : 'crc';
}
