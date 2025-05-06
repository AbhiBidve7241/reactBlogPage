import React from 'react'
const Input = React.forwardRef(function Input(
    {
    label,
    type='text',
    className='',
    ...props
}, ref) {
    const id=useId()
    return (
        <div className="w-full">
            {label &&<label className="mb-2 
            text-sm font-medium 
            text-gray-700"
            htmlFor="{props.id">{label}
                </label>}
            <input
            type="{type}"
            id={id}
            className={`w-full px-4 py-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500 ${className}`}
            ref={ref}
            {...props}
            />
        </div>
    )
})
export default Input