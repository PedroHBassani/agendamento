export const routesType = {
  panel: "panel",
  public: "public",
};

export const DAY_OF_WEEK = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export const orderStatus = {
  awaitingPayment: "Aguardando Pagamento",
  pendingPayment: "Pagamento Pendente",
  paymentConfirmed: "Pagamento Confirmado",
  inProcessing: "Em Processamento",
  sent: "Enviado",
  inTransit: "Em Trânsito",
  delivered: "Entregue",
  devolutionSolicitation: "Devolução Solicitada",
  devolutionInProcessing: "Devolução em Processamento",
  devolutionCompleted: "Devolução Concluída",
  devolutionRefused: "Devolução Recusada",
  canceled: "Cancelado",
  refunded: "Reembolsado",
};

export const paymentMethods = {
  creditCard: "Cartão de Crédito",
  ticket: "Boleto",
  pix: "Pix",
};
