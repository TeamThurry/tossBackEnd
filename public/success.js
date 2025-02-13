document.addEventListener("DOMContentLoaded", () => {
    // URL에서 쿼리 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const paymentKey = urlParams.get("paymentKey");
    const orderId = urlParams.get("orderId");
    const amount = urlParams.get("amount");
  
    // 결제 확인 요청
    async function confirmPayment() {
      const requestData = {
        paymentKey: paymentKey,
        orderId: orderId,
        amount: amount,
      };
  
      try {
        const response = await fetch("/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        const json = await response.json();
  
        if (!response.ok) {
          // 결제 실패 처리
          console.log(json);
          window.location.href = `/fail?message=${encodeURIComponent(
            json.message
          )}&code=${encodeURIComponent(json.code)}`;
        } else {
          // 결제 성공 처리
          console.log(json);
        }
      } catch (error) {
        console.error("결제 확인 중 오류 발생:", error);
      }
    }
  
    confirmPayment();
  
    // HTML 요소에 값 설정
    document.getElementById("paymentKey").textContent = "paymentKey: " + paymentKey;
    document.getElementById("orderId").textContent = "주문번호: " + orderId;
    document.getElementById("amount").textContent = "결제 금액: " + amount;
  });
  