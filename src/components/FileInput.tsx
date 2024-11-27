import { useCallback, useEffect, useState } from 'react';
import { DropzoneState, useDropzone } from 'react-dropzone';
import { CloseIcon } from '../icons/CloseIcon';
import { UploadIcon } from '../icons/UploadIcon';

interface InputProps {
  dropzone: DropzoneState;
}

interface HasFileProps {
  file: File;
  removeFile: () => void;
}

export const FileInput = ({ onImageUpload }: { onImageUpload: (files: File[]) => void }) => {
  const [files, setFiles] = useState<File[]>([]);

  const removeFile = useCallback((fileToRemove: File) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file !== fileToRemove);
      onImageUpload(updatedFiles); // Atualizar o estado no componente pai
      return updatedFiles;
    });
  }, [onImageUpload]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => {
      const newFiles = acceptedFiles.filter(
        (file) => !prevFiles.some((prevFile) => prevFile.name === file.name)
      );
      const updatedFiles = [...prevFiles, ...newFiles];
      onImageUpload(updatedFiles); // Atualizar o estado no componente pai
      return updatedFiles;
    });
  }, [onImageUpload]);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      'image/*': [], // Aceitar todos os tipos de imagem
    },
  });

  return (
    <div className="flex flex-col">
      <Input dropzone={dropzone} />
      <div className="flex flex-wrap gap-4 mt-4">
        {files.map((file) => (
          <HasFile key={file.name} file={file} removeFile={() => removeFile(file)} />
        ))}
      </div>
    </div>
  );
};

const Input = ({ dropzone }: InputProps) => {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <div
      {...getRootProps()}
      className={`h-40 rounded-lg border-dashed border-4 hover:border-gray-500 bg-gray-700 hover:bg-gray-600 transition-all
      ${isDragActive ? 'border-blue-500' : 'border-gray-600'}`}
    >
      <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
          <UploadIcon
            className={`w-10 h-10 mb-3 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          />
          {isDragActive ? (
            <p className="font-bold text-lg text-blue-400">Solte para adicionar</p>
          ) : (
            <>
              <p className="mb-2 text-lg text-gray-400">
                <span className="font-bold">Clique para enviar</span> ou arraste até aqui
              </p>
              <p className="text-gray-400 text-sm">Imagens</p>
            </>
          )}
        </div>
      </label>
      <input {...getInputProps()} className="hidden" />
    </div>
  );
};

const HasFile = ({ file, removeFile }: HasFileProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="flex flex-col items-center relative mb-2 w-1/4">
      {previewUrl && (
        <img src={previewUrl} alt={file.name} className="w-full h-20 object-cover rounded-lg" />
      )}
      <span className="block text-sm text-gray-500 text-center mt-1">{file.name}</span>
      <button
        type="button"
        onClick={removeFile}
        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-800 z-10"
        title="Remover imagem"
      >
        <CloseIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FileInput;
