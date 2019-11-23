class CoolCalendar {
  constructor(id) {
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();

    this.selectYear = document.getElementById("year");
    this.selectMonth = document.getElementById("month");
    this.startDate = "";
    this.endDate = "";

    this.days = [, "Sat", "Fri", "Thu", "Wed", "Tue", "Mon", "Sun"];
    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.nextcurrentMonth = (this.currentMonth + 1) % 12;
    this.nextcurrentYear =
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;

    this.createCalendar(this.currentYear, this.currentMonth, id);
    this.createCalendar(this.nextcurrentYear, this.nextcurrentMonth, id);
    this.createButtons(id);
    this.monthAndYear = document.getElementById(`${id}-${this.currentMonth}`);
    this.nextMonthAndYear = document.getElementById(
      `${id}-${this.nextcurrentMonth}`
    );
    this.monthAndYear.innerHTML = `${this.months[this.currentMonth]}, ${
      this.currentYear
    }`;
    this.nextMonthAndYear.innerHTML = `${
      this.months[(this.currentMonth + 1) % 12]
    }, ${this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear}`;
  }

  showCalendar(id) {
    let x = document.getElementById(id);
    if (window.getComputedStyle(x).display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  next(id) {
    this.currentMonth = this.nextcurrentMonth;
    this.nextcurrentMonth = (this.nextcurrentMonth + 1) % 12;
    this.currentMonth === 0
      ? (this.currentYear = this.currentYear + 1)
      : this.currentYear;
    this.monthAndYear.innerHTML = `${this.months[this.currentMonth]}, ${
      this.currentYear
    }`;
    this.nextMonthAndYear.innerHTML = `${this.months[this.nextcurrentMonth]}, ${
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear
    }`;
    this.currentMonth === 11
      ? (this.nextcurrentYear = this.nextcurrentYear + 1)
      : this.nextcurrentYear;

    let currentMonthElemId =
      this.currentMonth == 0 ? 11 : this.currentMonth - 1;
    let nextMonthElemId = currentMonthElemId == 11 ? 0 : currentMonthElemId + 1;

    let elementId = id.toElement.offsetParent.parentElement.id;
    let currentTbl = document.getElementById(
      `tbl-${elementId}-${this.months[currentMonthElemId]}`
    );
    let currentTbody = document.getElementById(
      `${elementId}-${this.months[currentMonthElemId]}`
    );

    let nextCurrentTbl = document.getElementById(
      `tbl-${elementId}-${this.months[nextMonthElemId]}`
    );
    let nextCurrentTbody = document.getElementById(
      `${elementId}-${this.months[nextMonthElemId]}`
    );

    this.updateCalendar(
      this.currentYear,
      this.currentMonth,
      currentTbl,
      currentTbody,
      elementId
    );
    this.updateCalendar(
      this.nextcurrentYear,
      this.nextcurrentMonth,
      nextCurrentTbl,
      nextCurrentTbody,
      elementId
    );
  }

  previous(id) {
    this.currentMonth = (this.currentMonth + 12 - 1) % 12;
    this.nextcurrentMonth = (this.currentMonth + 1) % 12;
    this.currentMonth === 11
      ? (this.currentYear = this.currentYear - 1)
      : this.currentYear;
    this.monthAndYear.innerHTML = `${this.months[this.currentMonth]}, ${
      this.currentYear
    }`;
    this.nextMonthAndYear.innerHTML = `${this.months[this.nextcurrentMonth]}, ${
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear
    }`;
    this.nextcurrentMonth === 11
      ? (this.nextcurrentYear = this.currentYear + 1)
      : this.currentYear;

    let currentMonthElemId =
      this.currentMonth == 11 ? 0 : this.currentMonth + 1;
    let nextMonthElemId = currentMonthElemId == 11 ? 0 : currentMonthElemId + 1;

    let elementId = id.toElement.offsetParent.parentElement.id;
    let currentTbl = document.getElementById(
      `tbl-${elementId}-${this.months[currentMonthElemId]}`
    );
    let currentTbody = document.getElementById(
      `${elementId}-${this.months[currentMonthElemId]}`
    );

    let nextCurrentTbl = document.getElementById(
      `tbl-${elementId}-${this.months[nextMonthElemId]}`
    );
    let nextCurrentTbody = document.getElementById(
      `${elementId}-${this.months[nextMonthElemId]}`
    );

    this.updateCalendar(
      this.currentYear,
      this.currentMonth,
      currentTbl,
      currentTbody,
      elementId
    );
    this.updateCalendar(
      this.nextcurrentYear,
      this.nextcurrentMonth,
      nextCurrentTbl,
      nextCurrentTbody,
      elementId
    );
  }

  daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  createCalendar(year, month, id) {
    let calendarDiv = document.getElementById(id);
    let currentMonthFrag = document.createDocumentFragment();
    let calDiv = document.createElement("div");
    calDiv.setAttribute("class", "monthBox");

    let monthName = document.createElement("span");
    monthName.setAttribute("id", `${id}-${month}`);

    let tbl = document.createElement("table");
    tbl.style.fontSize = 13;
    tbl.style.fontWeigh = 100;
    tbl.setAttribute("id", `tbl-${id}-${this.months[month]}`);

    let thead = document.createElement("thead");
    let hrow = thead.insertRow(0);
    this.days.forEach(day => {
      let cell = hrow.insertCell(0);
      cell.innerHTML = day;
    });
    tbl.appendChild(thead);

    let date = 1;
    let tbody = document.createElement("tbody");
    tbody.setAttribute("id", `${id}-${this.months[month]}`);
    tbody.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      let firstDay = new Date(year, month).getDay();
      let days = this.daysInMonth(this.currentMonth, this.currentYear);

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > days) {
          break;
        } else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(`${date}`);
          cell.appendChild(cellText);
          if (
            date === this.today.getDate() &&
            this.today.getMonth() === month
          ) {
            cell.style.color = "blue";
          }
          row.appendChild(cell);
          date++;
        }
      }
      tbody.appendChild(row);
    }
    tbl.appendChild(tbody);

    calDiv.appendChild(monthName);
    calDiv.appendChild(tbl);
    currentMonthFrag.appendChild(calDiv);

    let btndiv = document.createElement("div");
    let buttonNext = document.createElement("button");
    let buttonPrev = document.createElement("button");
    buttonNext.innerHTML = "NEXT";
    buttonPrev.innerHTML = "PREV";
    btndiv.appendChild(buttonPrev);
    btndiv.appendChild(buttonNext);
    calendarDiv.appendChild(currentMonthFrag);

    tbody.addEventListener("click", this.showDates(id));
  }

  updateCalendar(year, month, tbl, tbody, id) {
    let date = 1;
    tbody.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      let row = document.createElement("tr");

      let firstDay = new Date(year, month).getDay();
      let days = this.daysInMonth(this.currentMonth, this.currentYear);

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > days) {
          break;
        } else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(`${date}`);
          if (
            date === this.today.getDate() &&
            this.today.getMonth() === month
          ) {
            cell.style.color = "blue";
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
        }
      }
      tbody.appendChild(row);
    }
    tbl.appendChild(tbody);
    tbl.setAttribute("id", `tbl-${id}-${this.months[month]}`);
    tbody.setAttribute("id", `${id}-${this.months[month]}`);
  }

  createButtons(id) {
    let btndiv = document.createElement("div");
    let buttonNext = document.createElement("button");
    let buttonPrev = document.createElement("button");
    buttonNext.innerHTML = "NEXT";
    buttonPrev.innerHTML = "PREV";
    btndiv.appendChild(buttonPrev);
    btndiv.appendChild(buttonNext);
    btndiv.setAttribute("class", "btn-container");
    document.getElementById(id).appendChild(btndiv);

    buttonNext.addEventListener("click", id => {
      this.next(id);
    });
    buttonPrev.addEventListener("click", id => {
      this.previous(id);
    });
  }

  showDates(id) {
    return e => {
      if (
        e.target.parentElement.parentElement.id ===
        `${id}-${this.months[this.currentMonth]}`
      ) {
        this.startDate = e.target.textContent;
      } else if (
        e.target.parentElement.parentElement.id ===
        `${id}-${this.months[this.nextcurrentMonth]}`
      ) {
        this.endDate = e.target.textContent;
      }

      let startDateText =
        this.startDate != ""
          ? `${this.startDate}/${this.currentMonth + 1}/${this.currentYear}`
          : "mm/dd/yyyy";

      let endDateText =
        this.endDate != ""
          ? `${this.endDate}/${this.nextcurrentMonth + 1}/${
              this.nextcurrentYear
            }`
          : "mm/dd/yyyy";

      document.querySelector(
        `#${id}`
      ).parentNode.childNodes[1].childNodes[1].value = ` ${startDateText} - ${endDateText}`;
      e.stopImmediatePropagation();
    };
  }
}

let myCalendar = new CoolCalendar("calendar-select");
let myCalendar2 = new CoolCalendar("calendar-select2");
