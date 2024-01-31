"use client"

import { useEffect, useState } from "react";

const DatePick = ({ year, setYear, month, setMonth, day, setDay }: any) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    const [currentMonth, setCurrentMonth] = useState('');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [yearsOptions, setYearsOptions] = useState<number[]>([]);
    const [monthsOptions, setMonthsOptions] = useState<string[]>([]);
    const [daysOptions, setDaysOptions] = useState<number[]>([]);
    const [numOfDays, setNumOfDays] = useState(30);

    useEffect(() => {
        const options = [];
        for (let i = 1900; i <= 2023; i++) {
            options.push(i);
        }
        setYearsOptions(options);
        setMonthsOptions(monthNames);

        setCurrentMonth(monthNames[currentDate.getMonth()]);
        setMonth(monthNames[currentDate.getMonth()]);
        setYear(currentYear);
        setDay(currentDay);
    }, []);

    useEffect(() => {
        const options = [];
        for (let i = 1; i <= numOfDays; i++) {
            options.push(i);
        }
        setDaysOptions(options);
    }, [numOfDays]);

    useEffect(() => {
        switch (month) {
            case 'February':
                const leapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
                setNumOfDays(leapYear ? 29 : 28);
                break;
            case 'January': case 'March': case 'May': case 'July': case 'August':
            case 'October': case 'December':
                setNumOfDays(31);
                break;
            default:
                setNumOfDays(30);
        }
    }, [month, year]);

    const addSelectField = (paramX: any, id: string, type: string, options: any[]) => {
        return (
            <div>
                <label htmlFor={id}><b>Select a {type}: </b></label>
                <br />
                <select className='rounded-full bg-transparent sign-in__btn min-w-[130px]'
                    id={id} value={paramX} onChange={(event) => {
                        if (type === 'month') {
                            setMonth(event.target.value)
                        } else if (type === 'year') {
                            setYear(parseInt(event.target.value, 10))
                        } else {
                            setDay(parseInt(event.target.value, 10))
                        }
                    }}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <br /><br />
            </div>
        );
    }

    return (
        <div className='flex'>
            <div className='flex flex-row justify-between'>
                {addSelectField(year, "selectyear", "year", yearsOptions)}
                {addSelectField(month, "selectmonth", "month", monthsOptions)}
                {addSelectField(day, "selectday", "day", daysOptions)}
            </div>
        </div>
    )
}

export default DatePick