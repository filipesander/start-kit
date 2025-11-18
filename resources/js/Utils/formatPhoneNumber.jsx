export default (value) => {
  const phoneNumber = value.replace(/\D/g, '');

  if(phoneNumber.length > 10) {
    return phoneNumber.replace(/(\d{2})(\d)/, '($1) $2 ')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }

  return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
}