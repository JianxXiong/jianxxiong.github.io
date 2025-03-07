/**
 * 本地访问计数器 - 使用本地存储统计访问量
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取计数器元素
    const visitCountElement = document.getElementById('visit-count');
    if (!visitCountElement) {
        console.error('访问计数器元素未找到');
        return;
    }
    
    // 从本地存储获取计数
    let visitCount = localStorage.getItem('visitCount');
    
    // 如果不存在计数或计数无效，设置为1
    if (!visitCount || isNaN(parseInt(visitCount, 10))) {
        visitCount = "1";
    } else {
        // 增加计数
        visitCount = (parseInt(visitCount, 10) + 1).toString();
    }
    
    // 保存到本地存储
    localStorage.setItem('visitCount', visitCount);
    
    // 更新显示
    visitCountElement.textContent = formatNumber(parseInt(visitCount, 10));
});

/**
 * 格式化数字，添加千位分隔符
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 