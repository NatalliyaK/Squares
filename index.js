const wrapper = document.querySelector('.wrapper');

const stopBlock = document.createElement('div');
stopBlock.classList.add('stop');
wrapper.appendChild(stopBlock);

const container = document.createElement('div');
container.classList.add('wrapper-container');
stopBlock.appendChild(container);


for (let i = 0; i < 3; i++) {
    let newItem = document.createElement('div');
    newItem.classList.add('wrapper-item');
    container.appendChild(newItem);
}

let firstBlockRotation = 0;
let secondBlockRotation = 0;
let thirdBlockRotation = 0;

function isElementInMiddleOfViewport(el) {
    let rect = el.getBoundingClientRect();
    let windowHeight = window.innerHeight;
    let middleOfViewport = windowHeight / 2;
    let middleOfElement =  rect.top + (rect.height / 2);

    return middleOfElement < middleOfViewport && rect.bottom > middleOfViewport;
}

wrapper.addEventListener('wheel', function(event) {
    const delta = event.deltaY;
    let scrollPosition = Math.ceil(window.scrollY);

    let elDistanceToTop = window.scrollY + stopBlock.getBoundingClientRect().top;


    let firstBlock = document.querySelector('.wrapper-item:first-child');
    let secondBlock = document.querySelector('.wrapper-item:nth-child(2)');
    let thirdBlock = document.querySelector('.wrapper-item:last-child');


    if (isElementInMiddleOfViewport(stopBlock)) {

        if (delta < 0) {
            document.body.classList.add('overflow')
            if (thirdBlockRotation > 0) {
                thirdBlockRotation -= 10;
            } else if (secondBlockRotation > 0) {
                secondBlockRotation -= 10;
            } else if (firstBlockRotation > 0) {
                firstBlockRotation -= 10;
            }
            if (thirdBlockRotation === 0 && secondBlockRotation === 0 && firstBlockRotation === 0) {
                document.body.classList.remove('overflow');
            }

        } else {
            if (scrollPosition >= elDistanceToTop) {
                document.body.classList.add('overflow')
                if (firstBlockRotation < 90) {
                    firstBlockRotation += 10;
                } else if (secondBlockRotation < 90) {
                    secondBlockRotation += 10;
                } else if (thirdBlockRotation < 90) {
                    thirdBlockRotation += 10;
                }
                if (firstBlockRotation === 90 && secondBlockRotation === 90 && thirdBlockRotation === 90) {
                    document.body.classList.remove('overflow');
                }
            }
        }

    }

    firstBlock.style.transform = `rotate(${firstBlockRotation}deg)`;
    secondBlock.style.transform = `rotate(${secondBlockRotation}deg)`;
    thirdBlock.style.transform = `rotate(${thirdBlockRotation}deg)`;
})

