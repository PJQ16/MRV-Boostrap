import React from 'react';
import { RiErrorWarningLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

export default function Inputs({ label, name, type, placeholder, register, rules, errors, defaultValue, options, formStyle }) {
  return (
    <div className='my-2 position-relative'>
      <label htmlFor={name}>{label}</label>

      {type === 'select' ? (
        <select
          id={name}
          className={`${formStyle} ${errors[name] ? 'border-danger' : ''}`}
          {...register(name, { ...rules, value: defaultValue })}
        >
          <option value="">Please select</option>
          {options && options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          className={`${formStyle} ${errors[name] ? 'border-danger' : ''}`}
          placeholder={placeholder}
          {...register(name, { ...rules, value: defaultValue })}
        />
      )}

      {errors[name] && (
        <div className="position-absolute top-50 end-0 translate-middle mt-1 pb-2">
          <RiErrorWarningLine size={20} className='text-danger' />
        </div>
      )}
      {errors[name] && <span className='text-danger blockquote-footer'>{errors[name].message}</span>}
    </div>
  );
}
