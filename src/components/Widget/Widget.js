import React from 'react';
import cc from 'classcat';

const Widget = (props) => (
    <div className={cc(["codeflow-widget", props.className])}>
        <div className="codeflow-widget__title">
            <div className={
                cc(["codeflow-widget__title-icon", 
                    {
                        "codeflow-widget__title-icon": 
                        {
                            "--primary": (props.secondary || props.danger) ? false : true,
                            "--secondary": props.secondary,
                            "--danger": props.danger
                        }
                    }
                ])
            }>
                <i className={props.icon}></i>
            </div>
            <div className="codeflow-widget__title-text">
                <div className="codeflow-widget__title-text--label">Sales</div>
                <div className="codeflow-widget__title-text--value">R$ 2.000,00</div>
            </div>
        </div>
        <div className="widget-content-box">
            
        </div>
    </div>
);

export default Widget;