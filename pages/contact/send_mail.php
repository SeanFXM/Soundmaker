<?php
header('Content-Type: application/json');

// 获取POST数据
$data = json_decode(file_get_contents('php://input'), true);

// 构建邮件内容
$to = 'sean@soundmaker.jp';
$subject = 'お問い合わせが届きました';
$message = "
会社名: {$data['company']}
担当者: {$data['name']}
メールアドレス: {$data['email']}
電話番号: {$data['phone']}
メッセージ: {$data['message']}
確認事項: {$data['purpose']}
";

$headers = "From: {$data['email']}\r\n";
$headers .= "Reply-To: {$data['email']}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 发送邮件
$mailSent = mail($to, $subject, $message, $headers);

// 返回结果
echo json_encode(['success' => $mailSent]);
?> 