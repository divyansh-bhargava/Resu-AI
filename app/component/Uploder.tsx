import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '~/lib/utils'

interface uploaderprops {
    fileSubmit? : (file : File | null) => void
}

function Uploder({fileSubmit} : uploaderprops) {

    const maxFileSize = 20*1024*1024;

    const onDrop = useCallback((acceptedFiles: File[]) => {

        console.log(acceptedFiles);
        const file = acceptedFiles[0] || null;

        fileSubmit?.(file)
        
    }, [])

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        maxSize: maxFileSize,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    })

    const file = acceptedFiles[0] || null

    return (
        <div className='gradient-border w-full'>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='cursor-pointer '>
                    {
                        file ?
                            (
                                <div className='uploader-selected-file' onClick={(e) => e.stopPropagation()}>
                                    <img
                                        src={'./images/pdf.png'}
                                        className='size-10'
                                    />
                                    <div className='flex flex-col items-center justify-center '>
                                        <p className='text-sm font-medium text-gray-700 truncate max-w-xs'>{file?.name}</p>
                                        <p className='text-sm text-gray-400'>{formatSize(file?.size)}</p>
                                    </div>
                                    <button
                                        onClick={() => {fileSubmit?.(null) }}
                                        className="p-2 cursor-pointer"
                                    >
                                        <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                                    </button>
                                </div>
                            )
                            :
                            (
                                <div className='uplader-drag-area'>
                                    <div className='mx-auto w-16 h-16 flex items-center justify-center mb-2'>
                                        <img
                                        src={'/icons/info.svg'}
                                        className='size-20'
                                    />
                                    </div>
                                    <p className="text-lg text-gray-500">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span> or drag and drop
                                    </p>
                                    <p className="text-lg text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Uploder