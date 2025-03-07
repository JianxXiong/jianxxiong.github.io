/**
 * 访问计数器 - 使用Google Analytics 4实现
 * 需要在head部分已添加Google Analytics 4初始化代码
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取计数器元素
    const visitCountElement = document.getElementById('visit-count');
    if (!visitCountElement) {
        console.error('访问计数器元素未找到');
        return;
    }
    
    // 从本地存储获取计数作为初始显示
    let localCount = localStorage.getItem('visitCount');
    if (localCount && !isNaN(parseInt(localCount, 10))) {
        visitCountElement.textContent = formatNumber(parseInt(localCount, 10));
    } else {
        // 如果没有本地存储的计数，显示默认值
        visitCountElement.textContent = "0";
    }
    
    // 检查是否已加载Google Analytics 4
    if (typeof gtag === 'undefined') {
        console.error('Google Analytics 4未加载，请确保在head部分添加了Google Analytics初始化代码');
        useLocalCounter();
        return;
    }
    
    // 记录页面浏览事件
    gtag('event', 'page_view', {
        'page_title': document.title,
        'page_location': window.location.href,
        'page_path': window.location.pathname
    });
    
    // 创建自定义事件来增加计数
    gtag('event', 'visitor_count', {
        'event_category': 'engagement',
        'event_label': 'site_visit'
    });
    
    // 由于Google Analytics不直接提供实时数据获取API，
    // 我们使用本地计数作为显示，同时向GA发送数据用于后台分析
    useLocalCounter();
    
    // 创建自定义函数监听器，允许未来添加GA数据查询功能
    window.updateCounterFromGA = function(count) {
        if (count && !isNaN(parseInt(count, 10))) {
            visitCountElement.textContent = formatNumber(parseInt(count, 10));
            localStorage.setItem('visitCount', count.toString());
        }
    };
    
    /**
     * 使用本地存储计数方法
     */
    function useLocalCounter() {
        if (localCount && !isNaN(parseInt(localCount, 10))) {
            // 增加本地计数
            const count = parseInt(localCount, 10) + 1;
            visitCountElement.textContent = formatNumber(count);
            localStorage.setItem('visitCount', count.toString());
        } else {
            // 如果没有本地存储的计数，使用默认值
            visitCountElement.textContent = "1";
            localStorage.setItem('visitCount', "1");
        }
    }
});

/**
 * 格式化数字，添加千位分隔符
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 