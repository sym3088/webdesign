/* ============================================
   米米科技官網 - JavaScript 互動功能
   ============================================ */

// ==================== 移動菜單功能 ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
}

// 點擊菜單項目時關閉菜單
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
});

// ==================== 表單提交功能 ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 獲取表單數據
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // 驗證表單
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            alert('請填寫所有必填欄位');
            return;
        }
        
        // 驗證電子郵件格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('請輸入有效的電子郵件地址');
            return;
        }
        
        // 模擬提交（實際應用中應發送到伺服器）
        console.log('表單數據:', formData);
        
        // 保存到本地存儲（用於演示）
        let submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        submissions.push(formData);
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));
        
        // 顯示成功訊息
        showSuccessMessage();
        
        // 重置表單
        contactForm.reset();
    });
}

// 顯示成功訊息
function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #10B981;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        ">
            ✓ 感謝您的提交！我們將盡快與您聯繫。
        </div>
    `;
    document.body.appendChild(successMsg);
    
    // 3 秒後移除訊息
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// ==================== LINE 聯繫功能 ====================
function openLineChat() {
    // LINE 聯繫方式
    const lineId = 'sym000';
    const lineUrl = `https://line.me/ti/p/${lineId}`;
    
    // 嘗試打開 LINE 應用
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('android')) {
        // Android 設備
        window.location.href = `line://ti/p/${lineId}`;
        // 如果 LINE 應用未安裝，則打開網頁版
        setTimeout(() => {
            window.open(lineUrl, '_blank');
        }, 1000);
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        // iOS 設備
        window.location.href = `line://ti/p/${lineId}`;
        // 如果 LINE 應用未安裝，則打開網頁版
        setTimeout(() => {
            window.open(lineUrl, '_blank');
        }, 1000);
    } else {
        // 桌面設備
        window.open(lineUrl, '_blank');
    }
}

function contactUs() {
    // 滾動到聯繫表單
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// ==================== 滾動動畫功能 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 觀察所有服務卡片
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// 觀察所有作品集項目
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// 觀察所有定價卡片
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ==================== 平滑滾動效果 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== 導航欄粘性效果 ====================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== 計數器動畫 ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ==================== 頁面加載完成事件 ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('米米科技官網已加載完成');
    
    // 初始化頁面
    initializePage();
});

function initializePage() {
    // 添加加載完成類
    document.body.classList.add('loaded');
    
    // 初始化所有互動元素
    initializeButtons();
    initializeFormValidation();
}

// ==================== 按鈕互動 ====================
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ==================== 表單驗證 ====================
function initializeFormValidation() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#1E3A8A';
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#EF4444';
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#EF4444';
            return false;
        }
    }
    
    field.style.borderColor = '#E5E7EB';
    return true;
}

// ==================== 分析追蹤 ====================
function trackEvent(eventName, eventData = {}) {
    console.log(`事件: ${eventName}`, eventData);
    
    // 這裡可以集成 Google Analytics 或其他分析工具
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
}

// 追蹤按鈕點擊
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('button_click', {
            button_text: this.textContent,
            button_class: this.className
        });
    });
});

// 追蹤表單提交
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        trackEvent('form_submit', {
            form_id: this.id
        });
    });
}

// ==================== 性能優化 ====================
// 延遲加載圖片
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== 鍵盤快捷鍵 ====================
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + K 打開聯繫表單
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Escape 關閉移動菜單
    if (event.key === 'Escape') {
        mobileMenu.classList.remove('active');
    }
});

// ==================== 主題切換（可選） ====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// 檢查用戶偏好
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ==================== 社群媒體分享 ====================
function shareOnSocial(platform) {
    const url = window.location.href;
    const title = '米米科技 - 企業高質感網站製作專家';
    const text = '專業的品牌官網、企業網站、電商平台製作服務';
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        whatsapp: `https://wa.me/?text=${text} ${url}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// ==================== 實用工具函數 ====================
// 防抖函數
function debounce(func, wait) {
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

// 節流函數
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 獲取查詢參數
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// ==================== 錯誤處理 ====================
window.addEventListener('error', function(event) {
    console.error('發生錯誤:', event.error);
    // 可以在這裡發送錯誤報告到伺服器
});

// ==================== 頁面卸載前提示 ====================
window.addEventListener('beforeunload', function(event) {
    // 如果表單有未保存的更改，提示用戶
    const form = document.getElementById('contactForm');
    if (form && hasFormChanged(form)) {
        event.preventDefault();
        event.returnValue = '';
    }
});

function hasFormChanged(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    for (let input of inputs) {
        if (input.value.trim() !== '') {
            return true;
        }
    }
    return false;
}

// ==================== 控制台訊息 ====================
console.log('%c米米科技官網', 'font-size: 24px; color: #1E3A8A; font-weight: bold;');
console.log('%c企業高質感網站製作專家', 'font-size: 14px; color: #FF6B35;');
console.log('%cLINE ID: sym000', 'font-size: 12px; color: #10B981;');
