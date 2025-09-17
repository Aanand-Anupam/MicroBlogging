import React, { useId, forwardRef } from 'react';

const Input = forwardRef(function Input({
    label,
    type = 'text',
    placeholder = "",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className="inline-block mb-1 pl-1">{label}</label>}
            <input
                id={id}
                type={type}
                ref={ref}
                className={`px-4 py-2 rounded-md bg-white text-gray-700 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 w-full ${className}`}
                placeholder={placeholder}
                {...props}
            />
        </div>
    )
})

export default Input;