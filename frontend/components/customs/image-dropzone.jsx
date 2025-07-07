'use client';
import { Upload, Ban } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageDropzone() {
    const [file, setFile] = useState({});
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 1,
        onDrop: function(acceptedFiles) {
            if(!acceptedFiles.length) {
                setFile({
                    message: "Please select a single food image."
                })
            } else {
                const selectedfile = acceptedFiles[0];
                const newFile = Object.assign(selectedfile, {
                    preview: URL.createObjectURL(selectedfile),
                    message: selectedfile.name
                });
                setFile(newFile)
            }
        }
    });

    const isImgUploaded = !(Object.keys(file).length) ? true : false;

    return (
        <div {...getRootProps()} className="duration-150 ease-in text-[#999] flex flex-col gap-4 text-sm items-center border-2 border-dashed border-[#eeeeee] bg-[#fafafa] rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer shadow-sm">
            <input {...getInputProps()} />
            {
                isImgUploaded ? 
                <>
                    <Upload size={48} />
                    <p>Drag a single food image here, or click to browse</p>
                </> :
                <>
                    { 
                        ( !file.preview ) ? 
                        <Ban size={48} /> : 
                        <img src={file.preview} width={48} height={48} onLoad={() => URL.revokeObjectURL(file.preview)}/> 
                    }
                    <p className="truncate w-2xs">{ file.message }</p>
                </>
            }
        </div>
    )
}