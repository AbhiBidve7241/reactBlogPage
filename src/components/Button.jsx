import React from 'react'

function Button({
    children,
    type='button',
    bgColor='bg-gray-500',
    textColor='text-white',
    className='',
    ...props

}) {
  return (
    <button className={`px-4 py-2 rounded-md 
    ${bgColor} ${textColor} 
    ${className}`} type={type}
     {...props}>
        {children}
    </button>
  )
}

export default Button