/**
 * Simple visitor counter using a free counter API
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取计数器元素
    const visitCountElement = document.getElementById('visit-count');
    
    // 使用免费的API服务统计访问量
    // 这里使用 https://api.countapi.xyz/ 服务
    // 替换 'your-namespace' 和 'your-site-key' 为您自己的值
    // 如不设置，每个访问者都将增加计数，无论他们访问多少次
    
    const namespace = 'jianxiong-homepage';
    const key = 'visitors';
    
    // 构建API URL
    const apiUrl = `https://api.countapi.xyz/hit/${namespace}/${key}`;
    
    // 发送请求并更新计数
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // 更新计数显示
            if (data.value) {
                visitCountElement.textContent = formatNumber(data.value);
            }
        })
        .catch(error => {
            console.error('Visitor counter error:', error);
            // 如果API调用失败，显示一个默认值
            visitCountElement.textContent = "1";
        });
});

/**
 * 格式化数字，添加千位分隔符
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 