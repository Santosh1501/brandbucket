import React from 'react'
import * as alertReducer from '../../../../redux/alertbox/alert.reducer'
import { useSelector } from 'react-redux'


interface IProps { }

const Alert: React.FC<IProps> = () => {

    let alertState: alertReducer.AlertState = useSelector((
        state: { alerts: alertReducer.AlertState }) => {
        return state.alerts
    })

    let { alerts } = alertState
    return (
        <>
            {
                alerts.length > 0 &&

                <div className={`alert alert-${alerts[0].color} alert-dismissible fade show text-center animated slideInRight`} role="alert">
                    {
                        alerts.length > 0 ?
                            alerts.map((alert) => {
                                return (
                                    <em key={alert.id}>{alert.message}</em>
                                )
                            }) : null
                    }
                </div>
            }
        </>
    )
}

export default Alert
