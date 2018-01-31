import React, { Component } from 'react'
import { render } from 'react-dom'

import Button from '../../src/components/Button/Button.js';
import ListMasterDetail from '../../src/components/ListMasterDetail/ListMasterDetail.js';

class Buttons extends Component {

    constructor(props) {
        super(props);
        this.onClickLocal = this.onClickLocal.bind(this);
        this.onClickDia = this.onClickDia.bind(this);
        this.onClickHorario = this.onClickHorario.bind(this);
        this.state = {
            isLoading: false,
            data: [
                { local: 'Local 1', diaDaSemana: 'Segunda-feira', horario: 9, minuto: 10 },
                { local: 'Local 1', diaDaSemana: 'Segunda-feira', horario: 9, minuto: 20 },
                { local: 'Local 1', diaDaSemana: 'Segunda-feira', horario: 9, minuto: 30 },
                { local: 'Local 1', diaDaSemana: 'Segunda-feira', horario: 11, minuto: 20 },
                { local: 'Local 1', diaDaSemana: 'Segunda-feira', horario: 12, minuto: 30 },
                { local: 'Local 2', diaDaSemana: 'Terça-feira', horario: 14 },
                { local: 'Local 2', diaDaSemana: 'Terça-feira', horario: 15 },
                { local: 'Local 2', diaDaSemana: 'Terça-feira', horario: 16 },
                { local: 'Local 2', diaDaSemana: 'Terça-feira', horario: 17 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 15 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 9 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 10 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 11 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 12 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 13 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 14 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 15 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 16 },
                { local: 'Local 3', diaDaSemana: 'Sexta-feira', horario: 17 },
            ],
            locais: ['Local 1', 'Local 2', 'Local 3'],
            todosDias: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado', 'Domingo'],
            todosHorarios: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        };
    }

    onClickLocal(item, column) {
        const dias = [];
        const map = {};
        this.state.data.forEach(x => {
            if (!map[x.diaDaSemana] && x.local === item) {
                map[x.diaDaSemana] = x;
                dias.push(x.diaDaSemana)
            }
        });
        this.setState({localSelecionado: item, dias});
    }

    onClickDia(item, column) {
        const horarios = [];
        const map = {};
        this.state.data.forEach(x => {
            if (!map[x.horario] && x.diaDaSemana === item) {
                map[x.horario] = x;
                horarios.push(x.horario)
            }
        });
        this.setState({diaSelecionado: item, horarios});
    }

    onClickHorario(item, column) {
        const minutos = [];
        const map = {};
        this.state.data.forEach(x => {
            if (!map[x.minuto] && x.horario === item) {
                map[x.minuto] = x;
                minutos.push(x.minuto)
            }
        });
        this.setState({horarioSelecionado: item, minutos});
    }

    render() {
        const columns = [
            {
                title: "Local",
                titleIcon: 'fa fa-edit',
                manageable: true,
                values: this.state.locais,
                value: this.state.localSelecionado,
                text: (item) => item,
                onChange: this.onClickLocal,
            },
            {
                title: "Dias",
                manageable: true,
                values: this.state.dias,
                value: this.state.diaSelecionado,
                onChange: this.onClickDia,
            },
            {
                title: "Horários",
                manageable: true,
                values: this.state.horarios,
                value: this.state.horarioSelecionado,
                onChange: this.onClickHorario,
            },
            {
                title: "Minutos",
                manageable: true,
                values: this.state.minutos,
                value: this.state.minutoSelecionado,
            }
        ]
        return (
            <div className="demoRow">
                <ListMasterDetail
                    title="Horários"
                    titleIcon="fa fa-home"
                    columns={columns}
                />
            </div>
        );
    }
}


export default Buttons;