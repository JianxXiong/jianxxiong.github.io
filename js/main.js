// 导航栏高亮当前部分
document.addEventListener('DOMContentLoaded', function() {
    // 应用网站配置
    applySiteConfig();
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('nav a');
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', highlightNav);
    
    // 页面加载时执行一次，确保正确高亮
    highlightNav();
    
    function highlightNav() {
        // 获取当前滚动位置
        const scrollPosition = window.scrollY;
        
        // 获取所有部分
        const sections = document.querySelectorAll('section:not(.hidden)');
        
        // 遍历所有部分，检查哪个是当前可见的
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 移除所有链接的active类
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 给当前部分的链接添加active类
                const currentNavLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.add('active');
                }
            }
        });
    }
    
    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// 根据配置显示或隐藏各部分
function applySiteConfig() {
    if (typeof siteConfig === 'undefined') {
        console.warn('Site configuration not found. Using default settings.');
        return;
    }
    
    // 应用各部分配置
    applyElementConfig('about', siteConfig.about);
    applyElementConfig('research', siteConfig.research);
    applyElementConfig('publications', siteConfig.publications);
    applyElementConfig('projects', siteConfig.projects);
    applyElementConfig('education', siteConfig.education);
    applyElementConfig('patents', siteConfig.patents);
    applyElementConfig('awards', siteConfig.awards);
    
    // 应用联系方式配置
    if (siteConfig.contactInfo) {
        applyContactConfig('email', siteConfig.contactInfo.email);
        applyContactConfig('github', siteConfig.contactInfo.github);
        applyContactConfig('graduation-cap', siteConfig.contactInfo.googleScholar);
        applyContactConfig('file-pdf', siteConfig.contactInfo.cv);
    }
    
    // 更新导航栏
    updateNavigation();
}

// 更新导航栏，隐藏对应于隐藏部分的链接
function updateNavigation() {
    if (!siteConfig.showNavigation) {
        document.querySelector('nav').classList.add('hidden');
        return;
    }
    
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1); // 移除 #
        const targetSection = document.getElementById(targetId);
        
        if (targetSection && targetSection.classList.contains('hidden')) {
            link.parentElement.classList.add('hidden');
        } else {
            link.parentElement.classList.remove('hidden');
        }
    });
}

// 设置元素显示或隐藏
function applyElementConfig(id, isVisible) {
    const element = document.getElementById(id);
    if (element) {
        if (isVisible) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
}

// 设置联系方式显示或隐藏
function applyContactConfig(iconName, isVisible) {
    const contactLink = document.querySelector(`.contact-info a i.fa-${iconName}`);
    if (contactLink) {
        const parentLink = contactLink.closest('a');
        if (isVisible) {
            parentLink.classList.remove('hidden');
        } else {
            parentLink.classList.add('hidden');
        }
    }
}

// 自动更新年份
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const lastUpdated = document.getElementById('last-updated');
    
    // 英文月份名称
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    
    if (lastUpdated) {
        const currentMonth = new Date().getMonth(); // 0-11
        lastUpdated.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    // 更新版权年份
    const copyrightElements = document.querySelectorAll('footer p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('©')) {
            element.textContent = element.textContent.replace(/\d{4}/, currentYear);
        }
    });
}); 