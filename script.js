function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  const chatBox = document.getElementById("chat-box");

  if (userInput.trim() === "") return;

  // Hiển thị tin nhắn người dùng
  chatBox.innerHTML += `<p><strong>Bạn:</strong> ${userInput}</p>`;

  // Gửi câu hỏi lên Botpress
  fetch("http://localhost:3000/api/v1/bots/heartbot/converse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "text", text: userInput })
  })
  .then(response => response.json())
  .then(data => {
    const botReply = data.responses[0]?.payload?.text || "Bot không hiểu câu hỏi.";
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  document.getElementById("user-input").value = "";
}
