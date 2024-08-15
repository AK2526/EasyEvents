import React, { useEffect, useState } from 'react'
import Button from './Button'
import { getImageUrl } from '../lib/data'

function UploadImg({file, setFile, onlineFileName=null, onlineOGName=null, clientSetUpdate=null}) {
    const [img, setImg] = useState(null)
    const [updated, setUpdated] = useState(onlineFileName ? false : true)

    useEffect(() => {
        if (clientSetUpdate){
            clientSetUpdate(updated)
        }
        if (file ) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImg(reader.result)
            }
            reader.readAsDataURL(file)
        }
        else if (onlineFileName && !updated){
            getImageUrl(onlineFileName).then((url) => {setImg(url)})
        }
        else{
            setImg(null)
        }
    }, [file, updated])

    const handleFile = (e) => {
        if (e.target.files.length > 0)
        {setFile(e.target.files[0])}
        else{setFile(null)}
        setUpdated(true)
        
    }
    return (
        <div className='flex w-full flex-col'>
            <div className='align-middle justify-center flex flex-row'>
                <div>
                    {img && <img onClick={() => {setFile(null); setUpdated(true)}} src={img} alt="Preview" className=' h-40 rounded-md shadow-lg hover:cursor-pointer' title='Click to remove' />}
                </div>
            </div>
            <div className=' text-white flex flex-row justify-center'>
                <div>
                    {updated 
                    ?<label onChange={handleFile} for="file-upload" className='text-center text-xl justify-center p-5 shadow-lg bg-primary hover: cursor-pointer hover:bg-black rounded-md'>
                        {file ? file.name : "Upload Image"}
                    </label>
                    :
                    <label onChange={handleFile} for="file-upload" className='text-center text-xl justify-center p-5 shadow-lg bg-primary hover: cursor-pointer hover:bg-black rounded-md'>
                        {file ? file.name : onlineOGName}
                    </label>}
                    
                    
                    <input id="file-upload" accept='image/*' type="file" style={{ display: 'none' }} className='bg-primary text-white' onChange={handleFile} />
                </div>

            </div>
        </div>
    )
}

export default UploadImg