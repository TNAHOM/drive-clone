import { Folder as FolderIcon, File as FileIcon } from 'lucide-react'
import React from 'react'
import type { File, Folder } from '~/lib/mock-data'
import Link from 'next/link'

export const FileRow = (props: {file: File}) => {
  const { file } = props
  return (
    <div>
        <li key={file.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-6 flex items-center">
              <Link href={file.url} className="flex items-center text-gray-100 hover:text-blue-400" target='_blank'>
                <FileIcon className="mr-3" size={20} />
                {file.name}
              </Link>
            </div>

            <div className="col-span-3 text-gray-400"></div>
            <div className="col-span-3 text-gray-400"></div>
          </div>
        </li>
    </div>
  )
}



export const FolderRow = (props: {folder: Folder, handleFolderClick: () => void}) => {
  const { folder, handleFolderClick } = props
  return (
    <div>
        <li key={folder.id} className="px-6 py-4 border-b border-gray-700 hover:bg-gray-750">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-6 flex items-center">
                <button
                  onClick={() => handleFolderClick()}
                  className="flex items-center text-gray-100 hover:text-blue-400"
                >
                  <FolderIcon className="mr-3" size={20} />
                  {folder.name}
                </button>
            </div>

            <div className="col-span-3 text-gray-400"></div>
            <div className="col-span-3 text-gray-400"></div>
          </div>
        </li>
    </div>
  )
}