function isValidNumberPlate(numberPlate) {
  const regex = /^K[A-Z]{2}\s[0-9]{3}[A-Z]$/;
  return regex.test(numberPlate);
}

export default isValidNumberPlate;
