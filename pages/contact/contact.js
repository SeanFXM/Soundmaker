document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            company: document.getElementById('company').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            purpose: document.getElementById('purpose').value
        };
        
        // 发送邮件
        sendEmail(formData);
    });
    
    function sendEmail(formData) {
        // 这里需要后端支持，可以使用PHP或其他后端语言处理邮件发送
        // 示例使用 fetch 发送数据到后端
        fetch('send_mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('お問い合わせを送信しました。');
                form.reset();
            } else {
                alert('送信に失敗しました。もう一度お試しください。');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('送信に失敗しました。もう一度お試しください。');
        });
    }
}); 