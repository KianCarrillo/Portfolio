// Theme Toggle
const toggle = document.getElementById("themeToggle");
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    toggle.innerHTML = "☀️";
}

toggle.addEventListener("click", () => {
    document.body.classList.add("theme-fade");
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    toggle.innerHTML = isDark ? "☀️" : "🌙";

    if(isDark){
        document.body.style.setProperty('--bg', '#0b0b0b');
        document.body.style.setProperty('--surface', '#1a1a1a');
        document.body.style.setProperty('--text', '#f5f5f5');
        document.body.style.setProperty('--muted', '#9ca3af');
        document.body.style.setProperty('--accent', '#ef4444');
    } else {
        document.body.style.setProperty('--bg', '#f9fafb');
        document.body.style.setProperty('--surface', '#f1f1f1');
        document.body.style.setProperty('--text', '#111827');
        document.body.style.setProperty('--muted', '#6b7280');
        document.body.style.setProperty('--accent', '#dc2626');
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
    setTimeout(()=>document.body.classList.remove("theme-fade"),400);
});

// Hamburger Menu
const menuToggle = document.getElementById("menuToggle");
const navLeft = document.querySelector(".nav-left");
const navRight = document.querySelector(".nav-right");
menuToggle.addEventListener("click", () => {
    navLeft.classList.toggle("open");
    navRight.classList.toggle("open");
});
document.querySelectorAll(".nav-left a, .nav-right a").forEach(link => {
    link.addEventListener("click", () => {
        navLeft.classList.remove("open");
        navRight.classList.remove("open");
    });
});

// Scroll Animations
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting){
            setTimeout(()=>entry.target.classList.add("show"), index*120);
        }
    });
}, { threshold:0.15 });
document.querySelectorAll(".hidden:not(.bmi-modal):not(.gaming-modal)").forEach(el => observer.observe(el));

// Navbar Active Link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-left a, .nav-right a");
window.addEventListener("scroll", () => {
    let current="";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if(pageYOffset >= sectionTop) current=section.getAttribute("id");
    });
    navLinks.forEach(link=>{
        link.classList.remove("active");
        if(link.getAttribute("href")===`#${current}`) link.classList.add("active");
    });
});

// Smooth scroll for arrow
document.querySelector(".scroll-down").addEventListener("click",()=>{
    document.querySelector("#about").scrollIntoView({behavior:"smooth"});
});

// BMI/Gaming Modal
function setupModal(cards, modalId){
    const modal = document.getElementById(modalId);
    const modalImg = modal.querySelector("img");
    const modalDesc = modal.querySelector("p");
    const modalClose = modal.querySelector(".bmi-close");

    cards.forEach(card=>{
        card.addEventListener("click", ()=>{
            modalImg.src = card.dataset.img;
            if(modalDesc) modalDesc.textContent = card.dataset.desc;
            modal.classList.add("show");
        });
    });

    modalClose.addEventListener("click", ()=>modal.classList.remove("show"));
    modal.addEventListener("click", e=>{if(e.target===modal) modal.classList.remove("show");});
}
setupModal(document.querySelectorAll(".bmi-card"), "bmiModal");
setupModal(document.querySelectorAll(".gaming-card"), "bmiModal"); // reuse modal for gaming pics

// Contact form
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    emailjs.sendForm("service_jqi8eig","template_q8m2lni",this)
    .then(()=>{ alert("Message sent successfully!"); contactForm.reset(); })
    .catch(()=>{ alert("Failed to send message. Please try again."); });
});

// Education pics modal
document.querySelectorAll('.edu-personal-pic').forEach(pic=>{
    pic.addEventListener('click',()=>{
        const modal = document.createElement('div');
        modal.classList.add('bmi-modal');
        modal.innerHTML = `<span class="bmi-close">&times;</span><img class="bmi-modal-img" src="${pic.src}">`;
        document.body.appendChild(modal);
        modal.classList.add('show');

        modal.querySelector('.bmi-close').addEventListener('click', ()=>modal.remove());
        modal.addEventListener('click', e=>{if(e.target===modal) modal.remove();});
    });
});
