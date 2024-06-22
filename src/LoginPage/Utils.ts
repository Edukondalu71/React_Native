const handleName = (e: any) => {
    return e ? e.length >= 3 : false
}
const handleEmail = (e: any) => (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(e))
const handleMobile = (e: any) => (/[6-9]{1}[0-9]{9}/.test(e))
const handlePassword = (e: any) => {
    return e ? (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(e)) : false
}

  // Debounce function
  const debounce = <T extends (...args: any[]) => any>(
    func: any,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

export {handleEmail, handleMobile, handleName, handlePassword, debounce}