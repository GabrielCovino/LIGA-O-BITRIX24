function ligar() {
  const urlParams = new URLSearchParams(window.location.search);
  const leadId = urlParams.get("ID");

  if (!leadId) {
    alert("ID do lead não encontrado na URL. Use ?ID=123 na URL.");
    return;
  }

  BX24.callMethod(
    'crm.lead.get',
    { id: leadId },
    function (result) {
      if (result.error()) {
        console.error(result.error());
        alert("Erro ao buscar lead.");
      } else {
        const data = result.data();
        if (data.PHONE && data.PHONE.length > 0) {
          let telefone = data.PHONE[0].VALUE.replace(/[^0-9]/g, '');
          window.location.href = "tel:+" + telefone;
        } else {
          alert("Nenhum telefone encontrado neste lead.");
        }
      }
    }
  );
}
