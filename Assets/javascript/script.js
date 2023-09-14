
import "../css/style.css"
import "../css/normalize.css"

let body = document.querySelector('body');
let main = document.querySelector('main');
let cursor = document.querySelector('#cursor');
let header = document.querySelector('header');
let hamburger = document.querySelector('.hamburger');
let stick1 = document.querySelector('.hamburger .one');
let stick3 = document.querySelector('.hamburger .three');
let navList = document.querySelector('.nav-list');
let navItems = document.querySelectorAll('.nav-anchor');
let themeBtn = document.querySelector('.theme-btn');
let skillBtn = document.querySelector('.skill-btn');
let toolBtn = document.querySelector('.tool-btn');
let skillButtonBefore = document.querySelector('.skill-tab');
let skillSection = document.querySelector('.skills-right .skills');
let toolSection = document.querySelector('.skills-right .tools');
let loadBtn = document.querySelector('.load-btn');
let scrollTop = document.querySelector('.scroll-top');






// Custom Cursor
body.addEventListener('mousemove', (loc) => {
    cursor.style.left = `calc(15px + ${loc.pageX}px)`;
    cursor.style.top = `calc(15px + ${loc.pageY}px)`;
});






hamburger.addEventListener('click', () => {
    // Hamburger Animation
    stick1.classList.toggle('one-active');
    stick3.classList.toggle('three-active');
    // Hamburger functionality
    navList.classList.toggle('nav-active');
});





themeBtn.addEventListener('click', () => {
    // Theme Button functionality
    if (themeBtn.checked) {
        body.classList.remove('light_theme');
        body.classList.add('dark_theme');
        cursor.style.mixBlendMode = "difference";

        /*Store this in the local storage of the device*/
        localStorage.setItem("theme", "dark_theme");
    } else {
        body.classList.add('light_theme');
        body.classList.remove('dark_theme');
        cursor.style.mixBlendMode = "normal";

        /*Store this in the local storage of the device*/
        localStorage.setItem("theme", "light_theme");
    }
});

//check & apply last time selected theme from localStorage
if (localStorage.getItem("theme") === "light_theme") {
    body.classList.add('light_theme');
    body.classList.remove('dark_theme');
    cursor.style.mixBlendMode = "normal";
    themeBtn.removeAttribute('checked');
} else {
    body.classList.remove('light_theme');
    body.classList.add('dark_theme');
    cursor.style.mixBlendMode = "difference";
    themeBtn.setAttribute('checked', '');
}







navItems.forEach(item => {
    // Close navbar on click of any navLink in small screen devices
    item.addEventListener('click', () => {
        navList.classList.remove('nav-active');
        stick1.classList.remove('one-active');
        stick3.classList.remove('three-active');
    });
});







window.onscroll = () => {
    // Add background color to the header upon scroll
    header.classList.toggle('header-shadow', window.scrollY > 50);

    // change color of theme button upon scroll
    document.querySelector('.slider').classList.toggle('slider-shadow', window.scrollY > 50);

    if (window.scrollY > 100) {
        scrollTop.style.display = "block";
    } else {
        scrollTop.style.display = "none";
    }
}








// Type writer Animation
let typeText = document.querySelector('.type-writer-text');

let skills = ['Web Developer', 'Frontend Engineer', 'Web Designer', 'Entrepreneur'];
let textArrayIndex = 0;
let charIndex = 0;

let type = () => {
    if (charIndex <= skills[textArrayIndex].length - 1) {
        typeText.textContent += skills[textArrayIndex].charAt(charIndex);
        charIndex++
        setTimeout(type, 100);    // this is a part of function, 1st time we call the function manually in eventlistener below but than 2nd time it runs due to this line because calling the function is also the part of this function so tachnically untill the conditions will keep on meeting this function will keep on running, So We run 1st function in event listener than 2nd function will run cuz we called it in the end of 1st function and than 3rd function will run cuz we called it in the end of 2nd function and this will create a loop untill there will be a function where if condition isn't met and this loop stops there
    } else {
        setTimeout(erase, 2000); // break after completing a word
    }
}

let erase = () => {
    if (charIndex > 0) {
        typeText.textContent = skills[textArrayIndex].slice(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 60);    // interval between deleting 2 consecutive letters
    } else {
        textArrayIndex++;
        if (textArrayIndex >= skills.length) {
            textArrayIndex = 0;
        }
        setTimeout(type, 500);   // delay between 2 different words
    }
}

document.addEventListener('DOMContentLoaded', function () {
    type();
});







skillBtn.addEventListener('click', () => {
    // make button highlight
    skillButtonBefore.style.transform = "translateX(0)";
    // change color of button text 
    skillBtn.style.color = "white";
    toolBtn.style.color = "black";
    // Add and Remove display of Section
    skillSection.style.display = "flex";
    toolSection.style.display = "none";
});

toolBtn.addEventListener('click', () => {
    // make button highlight
    skillButtonBefore.style.transform = "translateX(100%)";
    // change color of button text 
    toolBtn.style.color = "white";
    skillBtn.style.color = "black";
    // Add and Remove display of Section
    toolSection.style.display = "flex";
    skillSection.style.display = "none";
});










// Load more button functionality in Portfolio Section
let currentItems = 3;

loadBtn.addEventListener('click', (e) => {
    let projectList = [...document.querySelectorAll('.project-item')];
    let btnContent = document.querySelector('.load-btn span');
    // Add 3 more projects until the projects end
    if (currentItems < projectList.length) {
        for (let i = currentItems; i < currentItems + 3; i++) {
            if (projectList[i]) {     // This check if the projectList[i] exists or is truthy than it'll run the the below line of code   // without this practice when the loop reach at a point where the value of projectList[i] doesn't exist it'll throw an error and it'll break the whole code so this is good practice when dealing with these Array situations
                projectList[i].style.display = 'flex';
            }
        }
        currentItems += 3;
        if (currentItems >= projectList.length) {
            btnContent.textContent = 'Show Less';
        }
    } else {  // Remove all the projects except 1st 3
        btnContent.textContent = 'Load More';
        for (let i = projectList.length; i >= 3; i--) {
            if (projectList[i]) {
                projectList[i].style.display = 'none';
            }
        }
        currentItems = 3;
    }
});


import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


const tl1 = gsap.timeline();

tl1
    .from("#num-1", {
        opacity: 0,
        duration: 1,
        onStart: function () {
            $('#num-1').textillate({
                in: {
                    effect: 'fadeInUp',
                    callback: function () {
                        $('#num-1').textillate('out')
                    }
                },
                out: { effect: 'fadeOutUp' }
            });
        }
    })
    .from("#num-2", {
        opacity: 0,
        delay: 0.4,
        duration: 1,
        onStart: function () {
            $('#num-2').textillate({
                in: {
                    effect: 'fadeInUp',
                    callback: function () {
                        $('#num-2').textillate('out')
                    }
                },
                out: { effect: 'fadeOutUp' }
            });
        }
    })
    .from("#num-3", {
        opacity: 0,
        delay: 0.4,
        duration: 1,
        onStart: function () {
            $('#num-3').textillate({
                in: {
                    effect: 'fadeInUp',
                    callback: function () {
                        $('#num-3').textillate('out')
                    }
                },
                out: { effect: 'fadeOutUp' }
            });
        }
    })
    .from("#num-4", {
        opacity: 0,
        delay: 0.4,
        duration: 1,
        onStart: function () {
            $('#num-4').textillate({
                in: { effect: 'fadeInUp' }
            });
        }
    })
    .to('#web-starter', {
        delay: 0.4,
        duration: 1.2,
        bottom: '100%',
        ease: 'Power4.easeOut'
    })
    .to('main', {
        height: '100%'
    })
    .to('#cursor', {
        display: 'block',
        delay: '-1'
    })
    .from('header', {
        opacity: 0,
        y: 20,
        duration: 1,
    })
    .from('.home-left', {
        x: -150,
        scale: 1.3,
        opacity: 0,
        ease: 'Power2.easeOut',
        duration: 1.5
    })
    .from('.home-right', {
        x: 150,
        scale: 1.3,
        opacity: 0,
        duration: 1.5,
        ease: 'Power2.easeOut',
        delay: "-1.5"
    })
    .from([".home-social", ".scroll"], {
        opacity: 0,
        y: 60,
        duration: 0.5,
        ease: 'Elastic.easeOut'
    })

gsap.from('.specs-item', {
    scrollTrigger: {
        trigger: '#specs',
        start: 'top 70%',
    },
    opacity: 0,
    y: 20,
    duration: 2,
    ease: 'Power4.easeOut'
})

let tl3 = gsap.timeline();

tl3
    .from('.about-left', {
        opacity: 0,
        y: 30,
        duration: 2,
        ease: 'Power4.easeOut'
    })
    .from('.about-heading', {
        delay: '-2',
        opacity: 0,
        onStart: function () {
            $('.about-heading').textillate({
                loop: false,
                in: {
                    effect: 'fadeInUp',
                    duration: 100
                }
            });
        }
    })
    .from('.about-para', {
        delay: '-1',
        duration: 1.5,
        opacity: 0,
        y: 30,
        ease: 'Power4.easeOut'
    })

ScrollTrigger.create({
    trigger: "#about",
    start: 'top 70%',
    animation: tl3
})

let tl4 = gsap.timeline();

tl4
    .from('.skill-heading', {
        opacity: 0,
        onStart: function () {
            $('.skill-heading').textillate({
                loop: false,
                in: {
                    effect: 'fadeInUp',
                    duration: 100
                }
            });
        }
    })
    .from('.skills-para', {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: 'Power4.easeOut'
    })
    .from('.skills-right', {
        delay: '-1.5',
        opacity: 0,
        y: 30,
        duration: 2,
        ease: 'Power4.easeOut'
    })

ScrollTrigger.create({
    trigger: "#skills",
    start: 'top 70%',
    animation: tl4,
})




let tl5 = gsap.timeline();

tl5
    .from('.project-intro-left', {
        opacity: 0,
        y: 30,
        duration: 2,
        ease: 'Power4.easeOut'
    })
    .from('.work-heading', {
        delay: '-2',
        opacity: 0,
        onStart: function () {
            $('.work-heading').textillate({
                loop: false,
                in: {
                    effect: 'fadeInUp',
                    duration: 100
                }
            });
        }
    })
    .from(['.work-para2', '.work-para1'], {
        delay: '-1',
        duration: 1,
        opacity: 0,
        y: 20,
        ease: 'Power4.easeOut'
    })

ScrollTrigger.create({
    trigger: "#portfolio",
    start: 'top 70%',
    animation: tl5,
})



let tl6 = gsap.timeline();

tl6
    .from('.contact-right', {
        opacity:0,
        duration:3,
        y:30,
        ease:'Power4.easeOut'
    })
    .from('.contact-top .contact-heading', {
        delay: '-2',
        opacity: 0,
        onStart: function () {
            $('.contact-heading').textillate({
                loop: false,
                in: {
                    effect: 'fadeInUp',
                    duration: 100
                }
            });
        }
    })
    .from('.contact-name',{
        delay: '-1',
        duration: 1.5,
        opacity: 0,
        y: 30,
        ease: 'Power4.easeOut'
    })
    .from(['.contact-detail', '.contact-para'],{
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'Power4.easeOut'
    })

ScrollTrigger.create({
    trigger: "#contact",
    start: 'top 70%',
    animation: tl6,
})