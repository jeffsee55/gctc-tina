import React from "react";
import {
  useField,
  Form,
  FormikProps,
  Formik,
  validateYupSchema,
  yupToFormErrors,
  FormikHelpers,
} from "formik";
import * as yup from "yup";
import type { AnyObjectSchema } from "yup";

export const Form2 = <T extends object>({
  className = "",
  formClassName = "",
  children,
  schema,
  onSubmit,
  initialValues,
  secondaryButton,
}: {
  className?: string;
  formClassName?: string;
  schema?: AnyObjectSchema;
  onSubmit: (values: object, actions: FormikHelpers<object>) => void;
  children: React.ReactNode;
  secondaryButton?: React.ReactNode;
  initialValues: T;
}) => {
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          onSubmit
            ? onSubmit(values, actions)
            : setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
        }}
      >
        {(props: FormikProps<T>) => (
          <Form className={formClassName}>
            {children}
            <div className="mt-8 border-t border-gray-200 pt-5">
              <div className="flex justify-end">
                {secondaryButton && <div>{secondaryButton}</div>}
                <div className="ml-3 inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    // className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-steel-medium hover:bg-steel-light focus:outline-none focus:border-steel-dark focus:shadow-outline-indigo active:bg-steel-dark transition duration-150 ease-in-out"
                    disabled={
                      props.isValid || props.isSubmitting ? false : true
                    }
                    className={`inline-flex w-36 items-center justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-steel-medium hover:bg-steel-light focus:outline-none focus:border-steel-dark focus:shadow-outline-indigo active:bg-steel-dark transition duration-150 ease-in-out ${
                      props.isValid ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    {props.isSubmitting ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
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
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

type Label = {
  label: string;
  subLabel?: string;
};

export const Toggle = (props: { name: string } & Label) => {
  const [field, meta, helpers] = useField({
    name: props.name,
    type: "checkbox",
  });
  const bgClass = meta.value ? "bg-steel-medium" : "bg-gray-200";
  const spanClass = meta.value ? "translate-x-5" : "translate-x-0";
  return (
    <div className="my-8 flex items-center justify-between">
      <Label label={props.label} subLabel={props.subLabel} />
      <span
        role="checkbox"
        tabIndex={0}
        aria-checked="false"
        onClick={() => helpers.setValue(!meta.value)}
        aria-labelledby="toggleLabel"
        className={`${bgClass} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
      >
        <span
          aria-hidden="true"
          className={`${spanClass} inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
        />
      </span>
    </div>
  );
};

export const Radio = ({
  name,
  label,
  subLabel,
  options,
}: {
  name: string;
  label: string;
  subLabel: string;
  options: {
    label: string;
    text: string;
    value: string;
  }[];
}) => {
  const [field, meta, helpers] = useField({ name, type: "radio" });

  const onBorder = "bg-indigo-50 border-steel-xlight z-10";
  const offBorder = "border-gray-200";
  const onLabel = "text-indigo-900";
  const offLabel = "text-gray-900";
  const onText = "text-steel-dark";
  const offText = "text-gray-500";
  return (
    <div>
      <Label label={label} subLabel={subLabel} />
      <fieldset>
        <legend className="sr-only">{label}</legend>
        <div className="bg-white rounded-md -space-y-px">
          {options.map((option, index) => {
            const rounding =
              index === 0
                ? "rounded-tl-md rounded-tr-md"
                : index === options.length - 1
                ? "rounded-bl-md rounded-br-md"
                : "";

            const isSelected = meta.value === option.value;
            const border = isSelected ? onBorder : offBorder;
            const label = isSelected ? onLabel : offLabel;
            const text = isSelected ? onText : offText;

            return (
              <div
                key={option.value}
                className={`relative border ${rounding} p-4 flex ${border}`}
              >
                <div className="flex items-center h-5">
                  <input
                    id={option.value}
                    name={field.name}
                    value={option.value}
                    defaultChecked={isSelected}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    type="radio"
                    className="form-radio h-4 w-4 text-steel-medium transition duration-150 ease-in-out cursor-pointer"
                  />
                </div>
                <label
                  htmlFor={option.value}
                  className={`ml-3 flex flex-col cursor-pointer`}
                >
                  <span
                    className={`block text-sm leading-5 font-medium ${label}`}
                  >
                    {option.label}
                  </span>
                  <span className={`block text-sm leading-5 ${text}`}>
                    {option.text}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};

type TextPrefixProps = {
  prefixClass?: string;
  prefix: string;
  placeholder?: string;
  name: string;
} & Label;
type TextSuffixProps = { suffix: string } & Label;

export const TextSuffix = (
  props: { name: string; placeholder?: string } & TextSuffixProps
) => {
  return (
    <div>
      <Label label={props.label} subLabel={props.subLabel} />
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            className="focus:ring-steel-light focus:border-steel-light flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder={props.placeholder}
          />
        </div>
        <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50">
          <span className="">{props.suffix}</span>
        </div>
      </div>
    </div>
  );
};

export const TextPrefixGroup = (
  props: { prefixClass?: string; items: TextPrefixProps[] } & Label
) => {
  return (
    <div>
      <Label label={props.label} subLabel={props.subLabel} />
      <div className="space-y-2">
        {props.items.map((item) => (
          <TextPrefix
            key={item.label}
            prefixClass={props.prefixClass}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export const Textarea = (
  props: { name: string; placeholder?: string } & Label
) => {
  const [field] = useField({
    name: props.name,
    type: "textarea",
  });
  return (
    <div>
      <Label label={props.label} subLabel={props.subLabel} />
      <textarea
        {...field}
        rows={3}
        className="shadow-sm block w-full focus:ring-steel-light focus:border-steel-light sm:text-sm border-gray-300 rounded-md"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export const Text = (props: { name: string; placeholder: string } & Label) => {
  const [field] = useField({
    name: props.name,
    type: "text",
  });
  return (
    <div>
      <Label label={props.label} subLabel={props.subLabel} />
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          {...field}
          type="text"
          // className="form-input flex-1 block w-full px-3 py-2 rounded-md text-sm leading-5"
          className="shadow-sm focus:ring-steel-light focus:border-steel-light block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export const TextPrefix = (props: TextPrefixProps) => {
  return (
    <div>
      <Label label={props.label} subLabel={props.subLabel} />
      <div className="flex rounded-md shadow-sm">
        <span
          className={`${props.prefixClass} inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm`}
        >
          {props.prefix}
        </span>
        <input
          type="text"
          id="company_website"
          className="flex-1 block w-full focus:ring-steel-light focus:border-steel-light min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export const CheckboxButtonGroup = ({
  label,
  name,
  subLabel,
  options,
}: {
  label: string;
  name: string;
  subLabel?: string;
  options: {
    value: string;
    shortLabel?: string;
    label: string;
  }[];
}) => {
  const [field, meta, helpers] = useField<string[]>({
    name: name,
    type: "checkbox",
  });
  return (
    <div>
      <Label label={label} subLabel={subLabel} />
      <div className="relative z-0 inline-flex shadow-sm rounded-md">
        {options.map((option, index) => {
          const rounding =
            index === 0
              ? "rounded-l-md"
              : index === options.length - 1
              ? "rounded-r-md -ml-px"
              : "-ml-px";

          const bg = meta.value.includes(option.value)
            ? "bg-steel-medium text-gray-100 active:bg-indigo-400 active:text-gray-200 border-indigo-300 "
            : "bg-gray-50 active:bg-gray-100 text-gray-500 border-gray-300 ";
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                if (meta.value.includes(option.value)) {
                  helpers.setValue(
                    meta.value.filter((value) => option.value !== value)
                  );
                } else {
                  helpers.setValue([...meta.value, option.value]);
                }
              }}
              className={`${rounding} ${bg} capitalize relative inline-flex items-center px-4 py-2 border bg-white text-sm leading-5 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150`}
            >
              <span className="sm:hidden">{option.shortLabel}</span>
              <span className={option.shortLabel ? "hidden sm:block" : ""}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const WeekCheckbox = ({
  label,
  subLabel,
  name,
}: {
  label: string;
  subLabel?: string;
  name: string;
}) => {
  const days = [
    { label: "Mon", shortLabel: "M", value: "mon" },
    { label: "Tue", shortLabel: "T", value: "tue" },
    { label: "Wed", shortLabel: "W", value: "wed" },
    { label: "Thu", shortLabel: "T", value: "thu" },
    { label: "Fri", shortLabel: "F", value: "fri" },
    { label: "Sat", shortLabel: "S", value: "sat" },
    { label: "Sun", shortLabel: "S", value: "sun" },
  ];
  return (
    <CheckboxButtonGroup
      name={name}
      label={label}
      subLabel={subLabel}
      options={days}
    />
  );
};

const Label = ({ label, subLabel }: Label) => {
  return (
    <label className={`flex flex-col mb-3`}>
      <span className={`block text-sm leading-5 font-medium text-gray-900`}>
        {label}
      </span>
      {subLabel && (
        <span className={`block text-sm leading-5 text-gray-500`}>
          {subLabel}
        </span>
      )}
    </label>
  );
};
