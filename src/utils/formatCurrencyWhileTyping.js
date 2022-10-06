export function formatCurrencyWhileTyping(value) {
  let valor = value;
  valor += '';
  valor = String(valor).replace(/[\D]+/g, '');
  valor += '';
  valor = valor.replace(/([0-9]{2})$/g, ',$1');
  if (valor.length > 6 && valor.length <= 9) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  }

  if (valor.length > 9) {
    valor = valor.replace(/(\d{1})(\d{3})(\d{3})/g, '$1.$2.$3');
  }
  return valor;
}
