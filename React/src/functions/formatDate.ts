export const formatDate = (
  date_with_time: string
): { time: string; wait: number } => {
  const date = date_with_time.slice(0, 10).split("-");
  const time = date_with_time.slice(11, 19).split(":");

  const then = Date.parse(
    `${date[1]} ${date[2]}, ${date[0]} ${time[0]}:${time[1]}:${time[2]}`
  );
  const now = Date.now() + new Date().getTimezoneOffset() * 60 * 1000;

  let difference = (now - then) / 60000;

  if (difference < 1) return { time: "Przed chwilą", wait: 60000 };
  if (difference < 60)
    return {
      time: Math.round(difference).toString() + " min. temu",
      wait: 60000,
    };

  difference /= 60;

  if (difference < 24) {
    if (Math.round(difference) === 1)
      return { time: "Godzine temu", wait: 3600000 };
    else
      return {
        time: Math.round(difference).toString() + " godz. temu",
        wait: 3600000,
      };
  }

  difference /= 24;

  if (difference < 7) {
    if (Math.round(difference) === 1)
      return { time: "Dzień temu", wait: 86400000 };
    else
      return {
        time: Math.round(difference).toString() + " dni temu",
        wait: 86400000,
      };
  }

  difference /= 7;

  if (difference < 4) {
    if (Math.round(difference) === 1) return { time: "Tydzień temu", wait: 0 };
    else
      return {
        time: Math.round(difference).toString() + " tyg. temu",
        wait: 0,
      };
  }

  difference /= 4;

  if (difference < 12) {
    if (Math.round(difference) === 1) return { time: "Miesiąc temu", wait: 0 };
    else
      return {
        time: Math.round(difference).toString() + " mies. temu",
        wait: 0,
      };
  }

  difference /= 12;

  if (Math.round(difference) === 1) return { time: "Rok temu", wait: 0 };
  else
    return { time: Math.round(difference).toString() + " lat temu", wait: 0 };
};
