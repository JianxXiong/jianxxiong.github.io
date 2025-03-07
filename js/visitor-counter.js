/**
 * 访问计数器 - 使用免费API服务统计访问量
 */
document.addEventListener('DOMContentLoaded', function() {
    // 获取计数器元素
    const visitCountElement = document.getElementById('visit-count');
    if (!visitCountElement) {
        console.error('访问计数器元素未找到');
        return;
    }
    
    // 配置 - 如果需要修改请更改这里
    const namespace = 'jianxxiong-github-io';  // 修改为不含点号的命名空间
    const key = 'visitors';
    
    // 尝试先从本地存储获取计数
    let localCount = localStorage.getItem('visitCount');
    if (localCount) {
        visitCountElement.textContent = formatNumber(parseInt(localCount, 10));
    }
    
    // 构建API URL - 使用增强兼容性的URL
    const apiUrl = `https://api.countapi.xyz/hit/${namespace}/${key}`;
    
    // 发送请求并更新计数
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API响应错误: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // 更新计数显示
            if (data && data.value !== undefined) {
                const count = parseInt(data.value, 10);
                visitCountElement.textContent = formatNumber(count);
                // 保存到本地存储作为备份
                localStorage.setItem('visitCount', count.toString());
            } else {
                throw new Error('API未返回有效数据');
            }
        })
        .catch(error => {
            console.error('访问计数器错误:', error);
            
            // 如果API调用失败但我们有本地存储的值，使用它
            if (localCount) {
                return;
            }
            
            // 如果没有本地存储的值，尝试使用另一个API端点
            const backupApiUrl = `https://api.countapi.xyz/create?namespace=${namespace}&key=${key}&value=1`;
            fetch(backupApiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data && data.value) {
                        visitCountElement.textContent = formatNumber(data.value);
                        localStorage.setItem('visitCount', data.value.toString());
                    }
                })
                .catch(backupError => {
                    console.error('备用API调用也失败:', backupError);
                    // 最后的备用方案：显示1
                    visitCountElement.textContent = "1";
                    localStorage.setItem('visitCount', "1");
                });
        });
});

/**
 * 格式化数字，添加千位分隔符
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 