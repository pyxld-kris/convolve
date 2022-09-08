import Rete from "rete";
const convertMonthNumberToString = (monthNumber) => {
  monthNumber -= 1;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[monthNumber];
};

const convertWeekdayNumberToString = (weekdayNumber) => {
  weekdayNumber -= 1;
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekdays[weekdayNumber];
};

const convertMonthNumberToSeason = (monthNumber) => {
  const monthToSeasonMapping = {
    1: "Winter",
    2: "Winter",
    3: "Spring",
    4: "Spring",
    5: "Spring",
    6: "Summer",
    7: "Summer",
    8: "Summer",
    9: "Autumn",
    10: "Autumn",
    11: "Autumn",
    12: "Winter",
  };

  return monthToSeasonMapping[monthNumber];
};

const convertDateToTimeString = (date) => {
  return (
    (date.getHours() % 12) +
    ":" +
    (parseInt(date.getMinutes()) >= 10
      ? date.getMinutes()
      : "0" + date.getMinutes()) +
    " " +
    (date.getHours() < 12 ? "AM" : "PM")
  );
};

export default class DateComponent extends Rete.Component {
  constructor() {
    super("Date");
    this.data.path = "Util";
    this.task = {
      outputs: {
        nowMilliseconds: "outputOption",
        yearNumber: "outputOption",
        monthNumber: "outputOption",
        dayNumber: "outputOption",
        hourNumber12: "outputOption",
        hourNumber24: "outputOption",
        minuteNumber: "outputOption",
        secondNumber: "outputOption",
        weekdayNumber: "outputOption",
        monthString: "outputOption",
        weekdayString: "outputOption",
        timeString: "outputOption",
        seasonString: "outputOption",
        dateString: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input(
      "in0",
      "inputSignal",
      this.editor.sockets.anyTypeSocket
    );

    // YearNumber
    // MonthNumber
    // DayNumber
    // HourNumber12
    // HourNumber24
    // MinuteNumber
    // SecondNumber
    // WeekdayNumber
    // MonthString
    // WeekdayString
    // DateString

    var nowOutput = new Rete.Output(
      "nowMilliseconds",
      "NowMilliseconds",
      this.editor.sockets.numSocket
    );
    var yearNumberOutput = new Rete.Output(
      "yearNumber",
      "YearNumber",
      this.editor.sockets.anyTypeSocket
    );
    var monthNumberOutput = new Rete.Output(
      "monthNumber",
      "MonthNumber",
      this.editor.sockets.anyTypeSocket
    );
    var dayNumberOutput = new Rete.Output(
      "dayNumber",
      "DayNumber",
      this.editor.sockets.anyTypeSocket
    );
    var hourNumber12Output = new Rete.Output(
      "hourNumber12",
      "HourNumber12",
      this.editor.sockets.anyTypeSocket
    );
    var hourNumber24Output = new Rete.Output(
      "hourNumber24",
      "HourNumber24",
      this.editor.sockets.anyTypeSocket
    );
    var minuteNumberOutput = new Rete.Output(
      "minuteNumber",
      "MinuteNumber",
      this.editor.sockets.anyTypeSocket
    );
    var secondNumberOutput = new Rete.Output(
      "secondNumber",
      "SecondNumber",
      this.editor.sockets.anyTypeSocket
    );
    var weekdayNumberOutput = new Rete.Output(
      "weekdayNumber",
      "WeekdayNumber",
      this.editor.sockets.anyTypeSocket
    );
    var monthStringOutput = new Rete.Output(
      "monthString",
      "MonthString",
      this.editor.sockets.anyTypeSocket
    );
    var weekdayStringOutput = new Rete.Output(
      "weekdayString",
      "WeekdayString",
      this.editor.sockets.anyTypeSocket
    );
    var timeStringOutput = new Rete.Output(
      "timeString",
      "TimeString",
      this.editor.sockets.anyTypeSocket
    );
    var seasonStringOutput = new Rete.Output(
      "seasonString",
      "SeasonString",
      this.editor.sockets.anyTypeSocket
    );
    var dateStringOutput = new Rete.Output(
      "dateString",
      "DateString",
      this.editor.sockets.anyTypeSocket
    );

    return node
      .addInput(inp1)
      .addOutput(nowOutput)
      .addOutput(yearNumberOutput)
      .addOutput(monthNumberOutput)
      .addOutput(dayNumberOutput)
      .addOutput(hourNumber12Output)
      .addOutput(hourNumber24Output)
      .addOutput(minuteNumberOutput)
      .addOutput(secondNumberOutput)
      .addOutput(weekdayNumberOutput)
      .addOutput(monthStringOutput)
      .addOutput(weekdayStringOutput)
      .addOutput(timeStringOutput)
      .addOutput(seasonStringOutput)
      .addOutput(dateStringOutput);
  }

  worker(node, inputs, outputs) {
    let inputSignal = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;

    let date = new Date();
    return {
      nowMilliseconds: Date.now(),
      yearNumber: date.getFullYear(),
      monthNumber: date.getMonth() + 1,
      dayNumber: date.getDate(),
      hourNumber12: date.getHours() % 12,
      hourNumber24: date.getHours(),
      minuteNumber: date.getMinutes(),
      secondNumber: date.getSeconds(),
      weekdayNumber: date.getDay() + 1,
      monthString: convertMonthNumberToString(date.getMonth() + 1),
      weekdayString: convertWeekdayNumberToString(date.getDay() + 1),
      timeString: convertDateToTimeString(date),
      seasonString: convertMonthNumberToSeason(date.getMonth() + 1),
      dateString: date.toDateString(),
    };
  }
}
