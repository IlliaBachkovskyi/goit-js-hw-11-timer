class CountdownTimer {
  #timerId = null;

  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.init();

    this.days = document.querySelector('[data-value = "days"]');
    this.hours = document.querySelector('[data-value = "hours"]');
    this.minutes = document.querySelector('[data-value = "minutes"]');
    this.seconds = document.querySelector('[data-value = "seconds"]');
  }

  init() {
    this.#timerId = setInterval(() => {
      const currentTime = Date.now();
      const time = this.targetDate - currentTime;
      if (time < 0) return this.stopTimer(this.#timerId);
        return this.changeTimer(this.getTimeComponents(time));
    }, 1000);
  }
  stopTimer(id) {
    clearInterval(id);
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const minutes = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, minutes, seconds };
  }

  changeTimer({ days, hours, minutes, seconds }) {
    this.days.textContent = `${days}`;
    this.hours.textContent = `${hours}`;
    this.minutes.textContent = `${minutes}`;
    this.seconds.textContent = `${seconds}`;
  }
}

const Countdown = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Nov 10, 2021"),
});