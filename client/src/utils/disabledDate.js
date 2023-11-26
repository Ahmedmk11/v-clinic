const disabledDate = (current) => {
    // Disable dates before today (including today)
    const today = new Date();
    // Set hours, minutes, seconds, and milliseconds to zero for precise comparison
    today.setHours(0, 0, 0, 0);

    // Disable dates before today (including today)
    return current && current.valueOf() < today.valueOf();
  };
  export default disabledDate;