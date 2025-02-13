document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    document.getElementById("code").textContent = "에러코드: " + (urlParams.get("code") || "알 수 없음");
    document.getElementById("message").textContent = "실패 사유: " + (urlParams.get("message") || "알 수 없음");
  });
  