document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. DYNAMIC NAVIGATION BAR BACKGROUND LOGIC ---
    const mainHeader = document.getElementById("mainHeader");

    window.addEventListener("scroll", function () {
        // Kapag ang page view scroll ay nasa zero (0)
        if (window.scrollY === 0) {
            mainHeader.classList.add("nav-top");
            mainHeader.classList.remove("nav-scrolled");
        } else {
            // Kapag nag-scroll pababa sa ibang slide area sections
            mainHeader.classList.add("nav-scrolled");
            mainHeader.classList.remove("nav-top");
        }
    });


    // --- 2. HOME SECTION GESTURE SWIPE & LINE INDICATOR LOGIC ---
    const homeSlides = document.querySelectorAll(".hero-carousel-slide");
    const homeProgressContainer = document.getElementById("homeProgressContainer");

    // Awtomatikong pagbuo ng line containers base sa dami ng slides sa Home
    homeSlides.forEach((_, index) => {
        const indicatorLine = document.createElement("div");
        indicatorLine.classList.add("progress-line-bar");
        if (index === 0) indicatorLine.classList.add("active");
        homeProgressContainer.appendChild(indicatorLine);
    });

    const homeIndicatorBars = homeProgressContainer.querySelectorAll(".progress-line-bar");

    const homeObserverOptions = {
        root: document.querySelector(".hero-slider-container"),
        threshold: 0.6 // Mag-ti-trigger kapag 60% ng slide ay pumasok sa viewport frame
    };

    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const activeIndex = parseInt(entry.target.getAttribute("data-index"));

                // I-update ang text animations class
                homeSlides.forEach(slide => slide.classList.remove("active-view"));
                entry.target.classList.add("active-view");

                // Sindihan ang kaukulang line indicator sa ilalim
                homeIndicatorBars.forEach(bar => bar.classList.remove("active"));
                if (homeIndicatorBars[activeIndex]) {
                    homeIndicatorBars[activeIndex].classList.add("active");
                }
            }
        });
    }, homeObserverOptions);

    homeSlides.forEach((slide) => homeObserver.observe(slide));


    // --- 3. TEAM MEMBERS SECTION HORIZONTAL SWIPE LOGIC ---
    const teamSlides = document.querySelectorAll(".team-carousel-slide");
    const progressContainer = document.getElementById("progressContainer");

    // Gawan ng indicators ang bawat team slide element
    teamSlides.forEach((_, index) => {
        const indicatorLine = document.createElement("div");
        indicatorLine.classList.add("progress-line-bar");
        if (index === 0) indicatorLine.classList.add("active");
        progressContainer.appendChild(indicatorLine);
    });

    const teamIndicatorBars = progressContainer.querySelectorAll(".progress-line-bar");

    const teamObserverOptions = {
        root: document.querySelector(".team-slider-container"),
        threshold: 0.7 
    };

    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const activeIndex = parseInt(entry.target.getAttribute("data-index"));

                teamSlides.forEach(slide => slide.classList.remove("active-view"));
                entry.target.classList.add("active-view");

                teamIndicatorBars.forEach(bar => bar.classList.remove("active"));
                if (teamIndicatorBars[activeIndex]) {
                    teamIndicatorBars[activeIndex].classList.add("active");
                }
            }
        });
    }, teamObserverOptions);

    teamSlides.forEach((slide) => teamObserver.observe(slide));


    // --- 4. PORTFOLIO MODAL MANIFEST ---
    const portfolioData = {
        apex: {
            title: "Apex Real Estate Site",
            overview: "Isang modernong platform na ginawa para sa real estate na may layuning i-automate ang pag-iskedyul ng property viewings.",
            features: [
                "Automated real-time viewing slot selection",
                "Responsive interactive layout for dynamic listing views",
                "Secure Client Admin dashboard built with React hooks"
            ],
            status: "Completed & Deployed"
        },
        trendvibe: {
            title: "TrendVibe Online Shop",
            overview: "E-Commerce web shop application na binuo para sa mabilisang digital checkout at pamamahala ng mga produkto.",
            features: [
                "Full local payment gateway integration through Stripe",
                "Persistent digital cart state system utilizing Next.js",
                "Automated email receipt dispatching mechanism"
            ],
            status: "Completed & Live Production"
        },
        bitedash: {
            title: "BiteDash Ordering App",
            overview: "Mobile food delivery and ordering system app para sa mabilis na transaksyon ng mga lokal na restaurant.",
            features: [
                "Live delivery tracking enabled by Google Maps API integration",
                "Instant cloud synchronization powered by Firebase DB",
                "Custom notification system triggered during order status transitions"
            ],
            status: "Beta Testing Phase"
        },
        edusmart: {
            title: "EduSmart School Mockups",
            overview: "Isang malawak na UI/UX research at design wireframe prototype para sa mga portal ng mag-aaral at guro.",
            features: [
                "Clean typography hierarchy focusing on grade readability grids",
                "High-fidelity interactive page flow mapped completely via Figma",
                "User persona research framework tailored for accessibility requirements"
            ],
            status: "Design Approved / Awaiting Dev Phase"
        }
    };

    const modal = document.getElementById("portfolioModal");
    const modalContent = document.getElementById("modalContent");
    const closeModalBtn = document.querySelector(".close-modal");
    const viewDetailsButtons = document.querySelectorAll(".btn-details");

    viewDetailsButtons.forEach(button => {
        button.addEventListener("click", function() {
            const projectKey = this.closest(".portfolio-item").getAttribute("data-project");
            const data = portfolioData[projectKey];

            if (data) {
                let featuresList = data.features.map(f => `<li>${f}</li>`).join("");
                
                modalContent.innerHTML = `
                    <div class="modal-project-title">${data.title}</div>
                    <div class="modal-body-text">
                        <h4>Project Overview:</h4>
                        <p>${data.overview}</p>
                        <h4>Key Specifications & Features:</h4>
                        <ul>${featuresList}</ul>
                        <h4>Development Status:</h4>
                        <p><strong>${data.status}</strong></p>
                    </div>
                `;
                modal.classList.add("open");
            }
        });
    });

    closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
    });


    // --- 5. DYNAMIC SHOOTING STARS ---
    function createSpaceShootingStar() {
        const star = document.createElement("div");
        star.className = "shooting-star";
        
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * (window.innerHeight * 0.7);
        const dynamicDuration = Math.random() * 2 + 1.5;
        
        star.style.left = `${randomX}px`;
        star.style.top = `${randomY}px`;
        star.style.animationDuration = `${dynamicDuration}s`;
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, dynamicDuration * 1000);
    }

    setInterval(createSpaceShootingStar, 4000);


    // --- 6. CONTACT FORM CONTEXT FIELD ---
    const dateInput = document.getElementById("dateSubmitted");
    if (dateInput) {
        dateInput.value = new Date().toLocaleString();
    }

    const form = document.getElementById("inquiryForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const clientName = document.getElementById("fullName").value;
        alert(`Salamat sa iyong inquiry, ${clientName}! Matagumpay naming natanggap ang impormasyon ng inyong kumpanya.`);
        form.reset();
        if (dateInput) dateInput.value = new Date().toLocaleString();
    });
});