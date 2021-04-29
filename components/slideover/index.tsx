import React from "react";
import ReactDOM from "react-dom";
import { useToggleMachine } from "../../hooks/useToggle";

type SlideOverType = {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  width?: "md" | "lg" | "xl";
  pad?: boolean;
};

export const SlideOver = (props: SlideOverType) => {
  return ReactDOM.createPortal(<SlideOverInner {...props} />, document.body);
};

export const SlideOverInner = ({
  isOpen,
  onClose,
  children,
  pad = false,
  width = "md",
}: SlideOverType) => {
  React.useEffect(() => {
    send(isOpen ? "OPEN" : "CLOSE");
  }, [isOpen]);

  const [_, send, classNames] = useToggleMachine({
    wrapper: {
      closed: {
        className: "pointer-events-none",
      },
      opened: {
        className: "pointer-events-all",
      },
    },
    overlay: {
      className: "ease-in-out duration-500",
      closed: {
        className: "opacity-0 pointer-events-none",
      },
      opened: {
        className: "opacity-100",
      },
    },
    panel: {
      className:
        "transform transition ease-in-out duration-500 sm:duration-700",
      closed: {
        className: "translate-x-full pointer-events-none",
      },
      opened: {
        className: "translate-x-0",
      },
    },
    closeButton: {
      className: "ease-in-out duration-500",
      closed: {
        className: "opacity-0",
      },
      opened: {
        className: "opacity-100",
      },
    },
  });

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${classNames.wrapper}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${classNames.overlay}`}
        />
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div
            className={`relative w-screen max-w-${width} ${classNames.panel}`}
          >
            <div
              className={`absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4 ${classNames.closeButton}`}
            >
              <button
                aria-label="Close panel"
                onClick={() => onClose()}
                className="text-gray-300 hover:text-white transition ease-in-out duration-150"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {pad ? (
              <div className="h-full flex flex-col space-y-6 py-6 bg-white shadow-xl overflow-y-scroll">
                <div className="relative flex-1 px-4 sm:px-6">{children}</div>
              </div>
            ) : (
              children
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
