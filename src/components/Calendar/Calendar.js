import React, { Component } from "react";
import cc from "classcat";

class Calendar extends Component {
  constructor(props) {
    super(props);
    //this.buildHeader = this.buildHeader.bind(this);

    this.state = {
      mode: "week",
      showingEvents: undefined,
      firstShowingDate: undefined,
      lastShowingDate: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    const firstSunday = new Date(nextProps.startDate.getTime());
    firstSunday.setDate(firstSunday.getDate() - nextProps.startDate.getDay());
    const sortedData = nextProps.data
      .filter(item => item.date >= firstSunday)
      .sort((a, b) => a.date - b.date);
     const firstDate = firstSunday;
    //const firstDate = sortedData.length > 0 ? sortedData[0].date : firstSunday;
    const lastDate = new Date(firstDate);
    lastDate.setDate(lastDate.getDate() + (6 - firstDate.getDay()));
    lastDate.setHours(23, 59, 59);
    const eventsToShowNow = {};
    let higherTime = 0;
    sortedData.forEach(item => {
      if (item.date >= firstDate && item.date < lastDate) {
        higherTime =
          item.date.getHours() > higherTime ? item.date.getHours() : higherTime;

        //Mudar aqui se quiser construir o obj em outro formato
        let horario = item.date.getHours();
        if (!eventsToShowNow[horario]) {
          eventsToShowNow[horario] = {};
        }
        eventsToShowNow[horario][item.date.getDay()] = item;
      }
    });
    lastDate.setHours(higherTime);
    this.setState({
      showingEvents: eventsToShowNow,
      firstShowingDate: firstDate,
      lastShowingDate: lastDate
    });
  }

  formatTime(time) {
    return time.length < 2 ? `0${time}:00` : `${time}:00`;
  }

  buildHeader() {
    let days = [];

    if (this.state.lastShowingDate) {
      let currentDay = new Date(this.state.lastShowingDate);
      for (let i = 0; i < 7; i++) {
        days.push(
          <div key={i} className="daybox">
            <div className="diaMes">{currentDay.getDate()}</div>
            <div className="diaSemana">
              {getDiaSemanaLabel(currentDay.getDay())}
            </div>
          </div>
        );
        currentDay.setDate(currentDay.getDate() - 1);
      }
      days.push(<div key={7} className="daybox empty" />);
    }
    return days.reverse();
  }

  buildTimes() {
    if (this.state.showingEvents) {
      const lines = [];
      for (
        let time = this.state.firstShowingDate.getHours();
        time < this.state.lastShowingDate.getHours();
        time++
      ) {
        const line = [
          <div key={time} className="timeLabel">
            {this.formatTime(time)}
          </div>
        ];
        for (let weekDay = 0; weekDay < 7; weekDay++) {
          let evento = this.state.showingEvents[time] ? (this.state.showingEvents[time][weekDay] || {}) : {};
          let livre =
            Object.keys(evento).length !== 0 && !evento.busy && !evento.yours
              ? "Vago"
              : "";
          let className = cc([
            "eventHolder",
            {
              outofwork: Object.keys(evento).length === 0,
              busy: evento.busy,
              yours: evento.yours,
              free: !evento.busy && !evento.yours
            }
          ]);
          line.push(
            <div
              key={`time${time}wk${weekDay}`}
              className={className}
              onClick={() => this.props.onEventClick(evento)}
            >
              {livre}
            </div>
          );
        }
        lines.push(
          <div key={time} className="time">
            {line}
          </div>
        );
      }
      return lines;
    }
    return null;
  }

  render() {
    return (
      <div className="calendar">
        <div className="days">{this.buildHeader()}</div>
        {this.state.showingEvents &&
        Object.keys(this.state.showingEvents).length > 0 ? (
          <div className="times">{this.buildTimes()}</div>
        ) : (
          <div className="aviso-vazio">Agenda ainda não está disponível para o periodo selecionado</div>
        )}
      </div>
    );
  }
}

const getDiaSemanaLabel = dia => {
  const labels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  return labels[dia];
};

export default Calendar;
