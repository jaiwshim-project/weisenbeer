// 네비게이션 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // 햄버거 아이콘 애니메이션
    hamburger.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // 드롭다운 메뉴가 있는 링크는 모바일에서 토글 처리
        if (window.innerWidth <= 968) {
            const parent = link.parentElement.parentElement;
            if (parent.classList.contains('has-dropdown') && link.parentElement.classList.contains('has-dropdown')) {
                e.preventDefault();
                parent.classList.toggle('active');
                return;
            }
        }

        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 모바일에서 드롭다운 토글
const dropdownParents = document.querySelectorAll('.has-dropdown');
dropdownParents.forEach(parent => {
    const mainLink = parent.querySelector('a');

    mainLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();
            parent.classList.toggle('active');

            // 다른 드롭다운 닫기
            dropdownParents.forEach(otherParent => {
                if (otherParent !== parent) {
                    otherParent.classList.remove('active');
                }
            });
        }
    });
});

// 스크롤 시 네비게이션 배경 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 24, 16, 1)';
    } else {
        navbar.style.background = 'rgba(44, 24, 16, 0.95)';
    }
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 관찰할 요소들
const animatedElements = document.querySelectorAll('.about-card, .strategy-item, .market-card, .highlight-card, .effect-item');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// 숫자 카운트 애니메이션
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('ko-KR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('ko-KR');
        }
    }, 16);
}

// 히어로 섹션의 숫자 애니메이션
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-item h3');
            stats.forEach((stat, index) => {
                const text = stat.textContent;
                if (text.includes('%')) {
                    const number = parseInt(text);
                    animateCounter(stat, number, 2000);
                    setTimeout(() => {
                        stat.textContent = number + '%';
                    }, 2000);
                } else if (text.includes('+')) {
                    const number = parseInt(text);
                    animateCounter(stat, number, 2000);
                    setTimeout(() => {
                        stat.textContent = number + '+';
                    }, 2000);
                }
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 폼 제출 처리
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 폼 데이터 수집
        const formData = new FormData(contactForm);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // 여기에 실제 폼 제출 로직을 추가할 수 있습니다
        console.log('Form submitted:', data);

        // 성공 메시지 표시
        alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');

        // 폼 초기화
        contactForm.reset();
    });
}

// 스크롤 진행률 표시 (선택사항)
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;

    // 진행률 바가 있다면 업데이트
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 마우스 호버 효과 (카드들)
const cards = document.querySelectorAll('.about-card, .market-card, .highlight-card, .effect-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 투자 금액 테이블 애니메이션
const tableObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const rows = entry.target.querySelectorAll('tbody tr');
            rows.forEach((row, index) => {
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateX(0)';
                }, index * 100);
            });
            tableObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const financialTable = document.querySelector('.financial-table');
if (financialTable) {
    const rows = financialTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        row.style.transition = 'all 0.5s ease';
    });
    tableObserver.observe(financialTable);
}

// 모바일 터치 스와이프 감지
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // 왼쪽으로 스와이프 - 메뉴 닫기
        navMenu.classList.remove('active');
    }
    if (touchEndX > touchStartX + 50) {
        // 오른쪽으로 스와이프 - 메뉴 열기
        navMenu.classList.add('active');
    }
}

// 성능 최적화: 스크롤 이벤트 쓰로틀링
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 스크롤 시 활성 섹션 표시
const sections = document.querySelectorAll('section[id]');

const highlightNav = throttle(() => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, 100);

window.addEventListener('scroll', highlightNav);

// 사업 전략 페이지: 현재 해시에 따른 하위 메뉴 활성화
function updateStrategySubmenu() {
    const hash = window.location.hash;
    const dropdownLinks = document.querySelectorAll('.has-dropdown .dropdown-menu a');

    // 모든 드롭다운 링크의 active 클래스 제거
    dropdownLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 현재 해시에 맞는 링크에 active 클래스 추가
    if (hash) {
        const activeLink = document.querySelector(`.dropdown-menu a[href*="${hash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        // 해시가 없으면 첫 번째 항목을 활성화 (프랜차이즈 전략)
        const firstLink = document.querySelector('#menu-franchise');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }
}

// 페이지 로드 시 실행
if (window.location.pathname.includes('strategy.html')) {
    updateStrategySubmenu();

    // 해시 변경 감지
    window.addEventListener('hashchange', updateStrategySubmenu);
}

// 드롭다운 링크 클릭 시 활성화 상태 즉시 업데이트
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// 콘솔 환영 메시지
console.log('%c바이젠 수제맥주', 'font-size: 24px; font-weight: bold; color: #D4A574;');
console.log('%c투자 제안서 웹사이트에 오신 것을 환영합니다!', 'font-size: 14px; color: #666;');
