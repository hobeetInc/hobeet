export const approvePayment = async (params: {
  cid: string;
  tid: string;
  partner_order_id: string;
  partner_user_id: string;
  pg_token: string;
}) => {
  const response = await fetch("/api/kakaopayApprove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const fetchOrderData = async (cid: string, tid: string) => {
  const response = await fetch("/api/kakaopayOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cid, tid })
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
};
