/**
 * Gera o código "Pix Copia e Cola" (payload EMV estático) para um pagamento.
 *
 * @param chavePix           Chave Pix do recebedor (e-mail, CPF/CNPJ, telefone ou aleatória)
 * @param nomeBeneficiario   Nome do recebedor (máx. 25 caracteres)
 * @param cidadeBeneficiario Cidade do recebedor (máx. 15 caracteres)
 * @param valorTotal         Valor da transação em reais (ex.: 12 ou 12.5)
 * @returns                  String pronta para copiar e colar no app do banco
 */
export function gerarPixCopiaCola(
  chavePix: string,
  nomeBeneficiario: string,
  cidadeBeneficiario: string,
  valorTotal: number,
): string {
  // Formata os campos no padrão EMV (ID + Tamanho + Conteúdo)
  const formatarCampo = (id: string, valor: string): string => {
    const tamanho = String(valor.length).padStart(2, '0');
    return id + tamanho + valor;
  };

  // Payload Format Indicator
  let pix = formatarCampo('00', '01');

  // Dados da conta (Chave Pix)
  const dadosConta = formatarCampo('00', 'br.gov.bcb.pix') + formatarCampo('01', chavePix);
  pix += formatarCampo('26', dadosConta);

  pix += formatarCampo('52', '0000'); // Merchant Category Code
  pix += formatarCampo('53', '986'); // Currency Code (986 = Real)

  // Valor dinâmico com duas casas decimais (ex.: "150.50")
  const valorFormatado = Number(valorTotal).toFixed(2);
  pix += formatarCampo('54', valorFormatado);

  pix += formatarCampo('58', 'BR'); // Country Code
  pix += formatarCampo('59', nomeBeneficiario.substring(0, 25)); // Nome do recebedor
  pix += formatarCampo('60', cidadeBeneficiario.substring(0, 15)); // Cidade do recebedor
  pix += formatarCampo('62', formatarCampo('05', '***')); // Transaction Id (opcional, "***")

  // Início do campo do CRC (verificação de erros)
  pix += '6304';

  return pix + calcularCRC16(pix);
}

/** Calcula o CRC16 (CCITT-FALSE) exigido pelo padrão Pix. */
function calcularCRC16(str: string): string {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    const byte = str.charCodeAt(i);
    crc ^= byte << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}
