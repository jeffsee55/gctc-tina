export const Loading = (props: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-40 opacity-90 bg-white flex items-center justify-center">
        <svg
          className="animate-spin relative z-50 -ml-1 mr-3 h-24 w-24 text-gold-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      {props.children}
    </div>
  );
};
