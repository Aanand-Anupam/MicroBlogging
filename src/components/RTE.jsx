import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import JoditEditor from 'jodit-react';

function RTE({ name, label, control, defaultValues = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='text-sm font-semibold text-gray-700'>{label}</label>}
            <Controller
                name={name || ""}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <JoditEditor
                        defaultValue={defaultValues}
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
        </div>
    )
}
export default RTE;