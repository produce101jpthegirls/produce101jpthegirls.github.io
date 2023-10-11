import { useSiteContext } from "@/context/site";
import { TRAINEES } from "@/constants";
import { Dialog, Transition } from "@headlessui/react";
import { isCompletedSelection } from "@/utils";
import domtoimage from "dom-to-image";
import { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from "react";
import { Palette } from "./views";

type CompleteModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CompleteModal: FC<CompleteModalProps> = ({ isOpen, setIsOpen }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="flex items-center justify-center mt-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="svg-success w-20 h-20" viewBox="0 0 24 24">
                  <g strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
                    <circle className="success-circle-outline" cx="12" cy="12" r="11.5" />
                    <circle className="success-circle-fill" cx="12" cy="12" r="11.5" />
                    <polyline className="success-tick" points="17,8.5 9.5,15.5 7,13" />
                  </g>
                </svg>
              </div>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-pd-pink-400"
              >
                Copied the URL
              </Dialog.Title>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

type DownloadModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DownloadModal: FC<DownloadModalProps> = ({ isOpen, setIsOpen }) => {
  const { selected } = useSiteContext();
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const isCompleted = isCompletedSelection(selected);
  const selectedTrainees: (Trainee | undefined)[] = selected.map((index) => index === 255 ? undefined : TRAINEES[index]);

  useEffect(() => {
    if (isOpen) {
      setDownloaded(false);
      setTimeout(() => {
        const node = document.getElementById("download-wrapper");
        if (node) {
          // Convert HTML to image
          // https://github.com/tsayen/dom-to-image/issues/69#issuecomment-486146688
          const scale = 2;
          domtoimage.toPng(node, {
            width: node.offsetWidth * scale,
            height: node.offsetHeight * scale,
            style: {
              fontFamily: "Noto Sans JP",
              transform: "scale(" + scale + ")",
              transformOrigin: "top left",
              width: node.offsetWidth + "px",
              height: node.offsetHeight + "px"
            },
          })
            .then((dataUrl) => {
              // Download the converted image
              const link = document.createElement('a');
              link.download = 'pick.png';
              link.href = dataUrl;
              link.click();
              setDownloaded(true);
            });
        }
      }, 500);
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[36rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div id="download-wrapper" className="bg-white p-2">
                  <div className="py-4 sm:p-4 rounded-2xl border border-gray-200 sm:m-4 overflow-hidden">
                    {isCompleted ? (
                      <Palette items={selectedTrainees} toDownload />
                    ) : (
                      <div>Error</div>
                    )}
                  </div>
                </div>
                <Dialog.Title
                  as="h3"
                  className="pt-2 sm:pt-0 pb-4 font-medium leading-6 text-pd-gray-300 text-center"
                >
                  {downloaded ? "Download started" : "Preparing the image..."}
                </Dialog.Title>
                <div className="flex justify-center pb-8">
                  <button
                    className={`px-1 text-sm sm:text-base rounded border ${downloaded ? "border-pd-pink-400 text-pd-pink-400" : "border-pd-gray-300 text-pd-gray-300"} 
                    hover:text-pd-pink-100 hover:border-pd-pink-100`}
                    onClick={() => setIsOpen(false)}
                  >Close</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
