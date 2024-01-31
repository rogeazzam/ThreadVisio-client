"use client"

import React, { FC, useRef, useState } from "react";

interface Props {
    otp: string[];
    setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

const OTPField: FC<Props> = ({ otp, setOtp }: Props): JSX.Element => {
    const inputRefs = new Array(6).fill(null).map(() => useRef<HTMLInputElement>(null));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;

        if (value.length === 1) {
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });

            if (index < otp.length - 1) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    return (
        <div className="center items-center space-x-2">
            {otp.map((digit, index) => {
                return (
                    <React.Fragment key={index}>
                        <input
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(e, index)}
                            className="w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition"
                            ref={inputRefs[index]}
                        />
                        {index === otp.length - 1 ? null : (
                            <span className="w-2 py-0.5 bg-gray-400" />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default OTPField;