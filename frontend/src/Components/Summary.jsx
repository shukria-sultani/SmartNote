
import { useEffect } from 'react';

import ReactMarkdown from 'react-markdown';

import { IoMdClose } from "react-icons/io"

import { FaDownload } from 'react-icons/fa';

import { usePDF } from 'react-to-pdf';

import { useTranslation } from '../hooks/useTranslationContext';

export default function Summary ({noteTitle, closeSummary, summary, contentDirection}){

      // Handle main vertical scroll

  useEffect(() => {

        document.body.classList.add('no-scroll');

                return () => {

            document.body.classList.remove('no-scroll');

        };

    }, []);

    const {toPDF, targetRef} = usePDF({

      filename: `${noteTitle || "Note"}_Summary.pdf`,

    resolution: 5, 

    page: { margin: 25.4 }, 

    })

    const {t}  = useTranslation()

      return (

        <>

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

         <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-secondary/30 bg-white shadow-xl">

            <IoMdClose
              className="absolute right-4 top-4 z-10 cursor-pointer text-2xl text-gray-400 transition hover:text-primary"
              onClick={closeSummary}
            />

            <div className="flex justify-end border-b border-gray-100 px-6 py-4">

              <button
                onClick={() => toPDF()}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary hover:text-gray-900 active:scale-95"
              >
                <FaDownload />
                {t("download_pdf")}
              </button>

            </div>

            <div
              ref={targetRef}
              className="px-6 py-8 sm:px-10 sm:py-10"
              style={{direction: contentDirection}}
            >

             <h3 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
               {t("summary_for")}{" "}
               <span className="text-primary">{noteTitle}</span>
             </h3>

              <ReactMarkdown
                className="text-sm leading-7 text-gray-700 sm:text-base"
              >
                {summary}
              </ReactMarkdown>

             </div>

         </div>

        </div>

        </>

      )

}

