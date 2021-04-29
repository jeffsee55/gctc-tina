import React from "react";
import moment, { Duration } from "moment";
import "moment-duration-format";

type TextFieldType = {
  label: string;
  name: string;
  type?: "text" | "email" | "url";
  value: number;
  factor: number;
  onChange: (value: number) => void;
};
type TimeFieldType = {
  label: string;
  name: string;
  type?: "text";
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
};

export const TextField = ({ onChange, value, factor }: TextFieldType) => {
  const [tempValue, setTempValue] = React.useState<string | number>(0);

  const displayRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (
      typeof document != "undefined" &&
      document.activeElement !== displayRef.current
    ) {
      const tempValue =
        Math.round((value / factor + Number.EPSILON) * 100) / 100;
      setTempValue(tempValue);
    }
  }, [value, factor]);

  const onChangeTemp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTempValue(e.target.value);
    if (!isNaN(value)) {
      onChange(value * factor);
    }
  };

  return (
    <input
      ref={displayRef}
      type="text"
      inputMode="decimal"
      onChange={onChangeTemp}
      className="w-full items-center justify-center text-4xl lg:text-5xl leading-none font-extrabold text-teal-600 text-center font-extrabold font-mono"
      value={tempValue}
    />
  );
};

export const TimeField = ({ onChange, value, label }: TimeFieldType) => {
  const [duration, setDuration] = React.useState<Duration | null>(null);
  const [ms, setMs] = React.useState<number>(0);
  const [display, setDisplay] = React.useState<string | null>(null);
  const [cursor, setCursor] = React.useState<{
    start: number | null;
    end: number | null;
  }>({ start: null, end: null });

  const displayRef = React.useRef<HTMLInputElement>(null);
  const msRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const duration = moment.duration(value);

    const nextMs = duration.milliseconds();

    if (nextMs > 999) {
      setDuration(
        moment.duration({
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
          milliseconds: ms,
        })
      );
      setMs(0);
    } else {
      setDuration(
        moment.duration({
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        })
      );
      setMs(duration.milliseconds());
    }
  }, [value]);

  React.useEffect(() => {
    if (duration) {
      if (
        typeof document != "undefined" &&
        document.activeElement !== displayRef.current &&
        document.activeElement !== msRef.current
      ) {
        const durationString = duration.format("H:mm:ss");
        setDisplay(durationString);
      }
    }
  }, [duration]);

  React.useEffect(() => {
    if (display && duration) {
      const numericValue = display.replace(/\D/g, "");
      const reverseArray = numericValue.split("").reverse();

      let seconds = reverseArray.slice(0, 2).reverse().join("");
      let minutes = reverseArray.slice(2, 4).reverse().join("");
      let hours = reverseArray.slice(4, 6).reverse().join("");

      let secondsInt = parseInt(seconds);
      let minutesInt = parseInt(minutes);
      let hoursInt = parseInt(hours);

      secondsInt = isNaN(secondsInt) ? 0 : secondsInt;
      minutesInt = isNaN(minutesInt) ? 0 : minutesInt;
      hoursInt = isNaN(hoursInt) ? 0 : hoursInt;

      const milliseconds =
        hoursInt * 60 * 60 * 1000 +
        minutesInt * 60 * 1000 +
        secondsInt * 1000 +
        ms;

      // Only trigger if we changed it ourselves
      if (
        (typeof document != "undefined" &&
          document.activeElement === displayRef.current) ||
        document.activeElement === msRef.current
      ) {
        onChange(milliseconds);
      }
    }
  }, [display, ms]);

  React.useEffect(() => {
    if (displayRef.current) {
      if (
        typeof document != "undefined" &&
        document.activeElement === displayRef.current
      ) {
        displayRef.current.selectionStart = cursor.start;
        displayRef.current.selectionEnd = cursor.end;
      }
    }
  }, [display, cursor]);

  const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    let numericValue = rawValue.replace(/\D/g, "");
    if (numericValue.length > 6) {
      numericValue = numericValue.substring(1);
    }

    const cleanedNewValue = chunk(numericValue.split("").reverse(), 2);
    const value = cleanedNewValue
      .map((item) => item.reverse().join(""))
      .reverse()
      .join(":");

    const start = e.target.selectionStart || 0;
    const startFromRight = e.target.value.length - start;
    let calc = value.length - startFromRight;

    if (calc < 0) {
      calc = 0;
    }

    if (value[calc - 1] === ":") {
      calc = calc - 1;
    }

    setCursor({ start: calc, end: calc });
    setDisplay(value);
  };

  const handleMsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    rawValue = rawValue.length > 3 ? rawValue.substring(1) : rawValue;
    const value = parseFloat(rawValue);
    if (isNaN(value)) {
      setMs(0);
    } else {
      setMs(value);
    }
  };

  const pre = "00:00:00";
  const displayLength = display ? display.length : 0;
  const placeholderValue = pre
    .split("")
    .map((item, index) => {
      const displayStartIndex = 8 - displayLength;
      if (index >= displayStartIndex) {
        return " ";
      } else {
        return item;
      }
    })
    .join("");

  const msDisplay = ms ? ms.toString().split(".")[0] : "";

  const [char, setChar] = React.useState();

  return (
    <div className="flex justify-center">
      <div className="flex justify-center relative w-48 md:w-64 lg:w-full">
        <input
          ref={displayRef}
          id={label}
          type="text"
          inputMode="decimal"
          value={display || ""}
          onChange={handleDisplayChange}
          onKeyPress={(e) => {
            // console.log(e.charCode);
            switch (e.charCode) {
              // "."
              case 46:
                setMs(0); // clear it out
                msRef.current && msRef.current.focus(); // breaking when built on gatsby
                break;

              default:
                break;
            }
          }}
          className="w-full relative z-20 bg-transparent text-4xl lg:text-5xl leading-none font-extrabold text-teal-600 text-right font-extrabold font-mono"
        />
        <input
          type="text"
          tabIndex={-1}
          placeholder={placeholderValue}
          style={{ top: "2.5px" }}
          className="opacity-25 placeholder-opacity-25 absolute z-10 bg-transparent inset-0 w-full text-4xl lg:text-5xl leading-none font-extrabold text-teal-600 text-right font-extrabold font-mono"
        />
        <div className="absolute bottom-0 right-1 transform translate-y-4">
          <input
            ref={msRef}
            className="w-8 p-1 text-xs text-gray-500 font-bold text-right"
            onChange={handleMsChange}
            value={msDisplay}
          />
          {(msDisplay ||
            (typeof document != "undefined" &&
              document.activeElement === msRef.current)) && (
            <span className="text-xs text-gray-500 font-bold ">ms</span>
          )}
        </div>
      </div>
    </div>
  );
};

const chunk = (inputArray: any[], perChunk: number): string[][] => {
  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
};
