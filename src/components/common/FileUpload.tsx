import React, { useState, useRef, useCallback } from 'react';
import { QuestionnaireRequiredUpload, FileUploadResponse } from '../../types';

interface FileUploadProps {
  upload: QuestionnaireRequiredUpload;
  onFileUpload: (uploadId: string, file: File) => void;
  onFileRemove: (uploadId: string) => void;
  existingFile?: FileUploadResponse;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  upload,
  onFileUpload,
  onFileRemove,
  existingFile,
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): boolean => {
    // Check file size
    if (upload.maxSize && file.size > upload.maxSize * 1024 * 1024) {
      alert(`File size must be less than ${upload.maxSize}MB`);
      return false;
    }

    // Check file type
    if (upload.fileTypes && upload.fileTypes.length > 0) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!fileExtension || !upload.fileTypes.includes(fileExtension)) {
        alert(`File type must be one of: ${upload.fileTypes.join(', ')}`);
        return false;
      }
    }

    return true;
  }, [upload.maxSize, upload.fileTypes]);

  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      setUploadProgress(0);
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            onFileUpload(upload.id, file);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  }, [validateFile, upload.id, onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [disabled, handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleRemoveFile = useCallback(() => {
    onFileRemove(upload.id);
    setUploadProgress(0);
  }, [upload.id, onFileRemove]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isUploading = uploadProgress > 0 && uploadProgress < 100;
  const hasFile = existingFile && existingFile.status === 'completed';

  return (
    <div className="file-upload-component-container">
      <div className="file-upload-component-header mb-3">
        <label className="file-upload-component-label block text-sm font-semibold text-slate-700 mb-1">
          {upload.label}
          {upload.maxSize && (
            <span className="file-upload-component-size-limit text-slate-500 font-normal ml-2">
              (Max {upload.maxSize}MB)
            </span>
          )}
        </label>
        {upload.description && (
          <p className="file-upload-component-description text-sm text-slate-600 mb-3">{upload.description}</p>
        )}
        {upload.fileTypes && (
          <p className="file-upload-component-formats text-xs text-slate-500 mb-3">
            Accepted formats: {upload.fileTypes.join(', ')}
          </p>
        )}
      </div>

      {!hasFile && !isUploading && (
        <div
          className={`
            file-upload-component-drop-zone relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${isDragOver 
              ? 'file-upload-component-drop-zone-active border-primary-emerald bg-primary-emerald/5' 
              : 'file-upload-component-drop-zone-inactive border-slate-300 hover:border-primary-emerald'
            }
            ${disabled ? 'file-upload-component-drop-zone-disabled opacity-50 cursor-not-allowed' : 'file-upload-component-drop-zone-enabled cursor-pointer'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <div className="file-upload-component-drop-zone-content space-y-3">
            <div className="file-upload-component-drop-zone-icon mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="file-upload-component-drop-zone-icon-svg w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div className="file-upload-component-drop-zone-text">
              <p className="file-upload-component-drop-zone-main-text text-sm font-medium text-slate-700">
                {isDragOver ? 'Drop file here' : 'Click to upload or drag and drop'}
              </p>
              <p className="file-upload-component-drop-zone-sub-text text-xs text-slate-500 mt-1">
                {upload.fileTypes ? upload.fileTypes.join(', ').toUpperCase() : 'Any file type'}
                {upload.maxSize && ` up to ${upload.maxSize}MB`}
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="file-upload-component-hidden-input hidden"
            onChange={handleFileInputChange}
            accept={upload.fileTypes?.map(type => `.${type}`).join(',')}
            disabled={disabled}
          />
        </div>
      )}

      {isUploading && (
        <div className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-emerald/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-emerald animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700">Uploading...</p>
              <div className="mt-2 bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-primary-emerald h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {hasFile && (
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {existingFile.file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {formatFileSize(existingFile.file.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="flex-shrink-0 p-1 text-slate-400 hover:text-red-600 transition-colors"
              disabled={disabled}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {existingFile?.status === 'error' && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">
              {existingFile.error || 'Upload failed. Please try again.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
