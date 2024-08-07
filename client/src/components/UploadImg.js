import React, { useEffect, useState } from 'react'
import Button from './Button'

function UploadImg({file, setFile}) {
    const [img, setImg] = useState(null)

    useEffect(() => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImg(reader.result)
            }
            reader.readAsDataURL(file)
        }
        else{
            setImg(null)
        }
    }, [file])

    const handleFile = (e) => {
        if (e.target.files.length > 0)
        {setFile(e.target.files[0])}
        else{setFile(null)}
        
    }
    return (
        <div className='flex w-full flex-col'>
            <div className='align-middle justify-center flex flex-row'>
                <div>
                    {img && <img onClick={() => setFile(null)} src={img} alt="Preview" className=' h-40 rounded-md shadow-lg hover:cursor-pointer' title='Click to remove' />}
                </div>
            </div>
            <div className=' text-white flex flex-row justify-center'>
                <div>

                    <label onChange={handleFile} for="file-upload" className='text-center text-xl justify-center p-5 shadow-lg bg-primary hover: cursor-pointer hover:bg-black rounded-md'>
                        {file ? file.name : "Upload Image"}
                    </label>
                    <input id="file-upload" accept='image/*' type="file" style={{ display: 'none' }} className='bg-primary text-white' onChange={handleFile} />
                </div>

            </div>
        </div>
    )
}

export default UploadImg