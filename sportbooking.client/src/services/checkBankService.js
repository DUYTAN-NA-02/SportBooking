export const checkBankService = async () => {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbwASor9hgudIgLAgOYdWrlOabRrMppd38r2QLeYwT9R9r7Y3WtU3-NqSZaVtqS-ep_zAg/exec`)
    const data = await response.json()
    return data.data;
}