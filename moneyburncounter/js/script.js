function init_divs(){
	const allChilds = document.getElementById('grid-container');
	for (element of allChilds.childNodes) {
		if (element.tagName == 'DIV') {
			element.addEventListener("click", play_file);
			element.addEventListener("mouseover", setColor);
		}
		
	}
}


function getColor() {
  let color = [];
  for (let i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  return 'rgb(' + color.join(', ') + ')';
} 

function setColor() {
  document.documentElement.style.setProperty('--hover-color', getColor());
}

function toggleMenu() {
    var navbarLinks = document.getElementById('navbar-links');
    navbarLinks.classList.toggle('active');
}



