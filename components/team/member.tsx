import React from "react";
import { Markdown } from "../../components/markdown";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  Form2,
  Toggle,
  Radio,
  Text,
  TextSuffix,
  TextPrefix,
  TextPrefixGroup,
  Textarea,
  WeekCheckbox,
  CheckboxButtonGroup,
} from "../../components/form";
import type { MemberHero } from "../../pages/team/[member]";
import { tinaField } from "tinacms/dist/react";

export const CoachingForm = (props: AuthorDataType["form"]["data"]) => {
  const initialValues: { [key: string]: "" | [] | boolean } = {};
  const [hasSubmitted, setHasSubmitted] = useLocalStorage("hasSubmitted", "0");

  props.fields?.forEach((field) => {
    switch (field?.__typename) {
      case "FieldText_Data":
      case "FieldTextarea_Data":
        initialValues[field.name || ""] = "";
        break;
      case "FieldWeekCheckbox_Data":
      case "FieldCheckbox_Data":
        initialValues[field.name || ""] = [];
        break;
      case "FieldGroupText_Data":
        field.fields?.forEach((subField) => {
          initialValues[subField?.name || ""] = "";
        });
        break;
      case "FieldBoolean_Data":
        initialValues[field?.name || ""] = false;
      default:
        break;
    }
  });

  return (
    <div className="relative" id="questionnaire">
      <div className="relative max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:text-left">
        <h2 className="text-xl md:text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none mt-4">
          {props.title}
        </h2>
        <Markdown
          classNames={{
            root: "my-5",
            h2:
              "mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900",
            p:
              "text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl",
          }}
          content={props.description}
        />
        {hasSubmitted !== "0" ? (
          <AfterSignup />
        ) : (
          <Form2
            onSubmit={async (values, actions) => {
              // await () => {}
              actions.setSubmitting(false);
              setHasSubmitted("1");
              console.log(values, actions);
            }}
            formClassName="space-y-8"
            initialValues={initialValues}
          >
            {props.fields?.map((field) => {
              switch (field?.__typename) {
                case "FieldCheckbox_Data":
                  return (
                    <CheckboxButtonGroup
                      label={field.label || ""}
                      name={field.name || ""}
                      subLabel={field.subLabel || ""}
                      options={
                        field.options?.map((option) => {
                          return {
                            label: option?.label || "",
                            value: option?.value || "",
                          };
                        }) || []
                      }
                    />
                  );
                case "FieldText_Data":
                  if (field.prefix) {
                    return (
                      <TextPrefix
                        label={field.label || ""}
                        subLabel={field.subLabel || ""}
                        prefix={field.prefix}
                        name={field.name || ""}
                        placeholder={field.placeholder || ""}
                      />
                    );
                  } else if (field.suffix) {
                    return (
                      <TextSuffix
                        label={field.label || ""}
                        subLabel={field.subLabel || ""}
                        suffix={field.suffix}
                        name={field.name || ""}
                        placeholder={field.placeholder || ""}
                      />
                    );
                  } else {
                    return (
                      <Text
                        label={field.label || ""}
                        subLabel={field.subLabel || ""}
                        name={field.name || ""}
                        placeholder={field.placeholder || ""}
                      />
                    );
                  }
                case "FieldRadio_Data":
                  return (
                    <Radio
                      name={field.name || ""}
                      label={field.label || ""}
                      subLabel={field.subLabel || ""}
                      options={
                        field.options?.map((option) => {
                          return {
                            label: option?.label || "",
                            value: option?.value || "",
                            text: "",
                          };
                        }) || []
                      }
                    />
                  );
                case "FieldBoolean_Data":
                  return (
                    <Toggle
                      name={field.name || ""}
                      label={field.label || ""}
                      subLabel={field.subLabel || ""}
                    />
                  );
                case "FieldTextarea_Data":
                  return (
                    <Textarea
                      label={field.label || ""}
                      subLabel={field.subLabel || ""}
                      name={field.name || ""}
                      placeholder={field?.placeholder || ""}
                    />
                  );
                case "FieldWeekCheckbox_Data":
                  return (
                    <WeekCheckbox
                      label={field.label || ""}
                      subLabel={field.subLabel || ""}
                      name={field.name || ""}
                    />
                  );
                case "FieldGroupText_Data":
                  return (
                    <TextPrefixGroup
                      prefixClass={field.prefix_class || ""}
                      label={field.label || ""}
                      subLabel={field.subLabel || ""}
                      items={
                        field.fields?.map((subField) => {
                          return {
                            label: subField?.label || "",
                            name: subField?.name || "",
                            prefixClass: field.prefix_class || "",
                            prefix: subField?.prefix || "",
                            subLabel: subField?.subLabel || "",
                            placeholder: subField?.placeholder || "",
                          };
                        }) || []
                      }
                    />
                  );
                default:
                // return <div>{`No switch case for ${field?.__typename}`}</div>;
              }
            })}
          </Form2>
        )}
      </div>
    </div>
  );
};

const AfterSignup = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Thanks for reaching out!</span>
          <span className="block">We'll be in touch soon.</span>
        </h2>
        {/* <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Learn more
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export const Hero = (props: MemberHero) => {
  if (props.__typename === "AuthorsAthlete") {
    return null;
  }
  return (
    <div className="relative bg-gray-50">
      <main className="lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <div className="bg-gray-900 p-2 inline-block">
              <div data-tina-field={tinaField(props,'role')} className="text-md tracking-wider leading-10 font-mono text-white sm:text-lg sm:leading-none uppercase">
                {props.role}
              </div>
            </div>
            <h1 data-tina-field={tinaField(props,'name')} className="text-4xl md:text-5xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none mt-4">
              {props.name}
            </h1>

            <div className="prose" data-tina-field={tinaField(props,'bioDescription')}>
              <Markdown
                content={props.bioDescription}
              />
            </div>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <a
                  href={`mailto:info@goldencoasttrackclub.com?subject=Work with Work with ${props.name.split(" ")[0]}`}
                  target="_blank"
                  style={{ backgroundColor: "#437598" }}
                  className="w-76 flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  <span className="">Work with {props.name.split(" ")[0]}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            {props.form && (
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <a
                  href="#questionnaire"
                  // className="w-76 flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-steel-medium hover:bg-steel-light focus:outline-none focus:border-steel-dark focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  style={{ backgroundColor: "#437598" }}
                  className="w-76 flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  <span className="">Work with {props.name.split(" ")[0]}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
        <div
          style={{ minHeight: "38rem" }}
          className="relative w-full h-80 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full"
        >
          <img
            data-tina-field={tinaField(props,'bio_image')}
            className="absolute inset-0 w-full h-full object-cover object-top"
            src={props.bio_image}
            alt=""
          />
        </div>
      </main>
    </div>
  );
};

export const Stats = (props: AuthorDataType) => {
  return (
    <div
      style={{ backgroundColor: "rgb(255, 244, 239)" }}
      className="relative overflow-hidden"
    >
      {/* <Pattern /> */}
      <div className="relative z-20 max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-800 sm:text-4xl sm:leading-10">
            {props.name.split(" ")[0]}'s accomplishments througout her +20
            year professional career
          </h2>
        </div>
        <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
          {props.accolades?.map((accolade, index) => {
            return (
              <div
              data-tina-field={tinaField(accolade)}
                key={accolade?.description}
                className={`flex flex-col ${
                  index === 0 ? "" : "mt-10 sm:mt-0"
                }`}
              >
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-900">
                  {accolade?.description}
                </dt>
                <dd className="order-1 text-5xl leading-none font-extrabold text-gray-600">
                  {accolade?.figure}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
};

export const Story = (props: AuthorDataType) => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative mb-8 lg:mb-0 lg:row-start-1 lg:col-start-2 md:mt-24">
            <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
              <figure>
                <div className="relative pb-7/12 lg:pb-0">
                  <img
                  data-tina-field={tinaField(props,'story_image')}
                    src={props.story_image}
                    alt=""
                    width={1184}
                    height={1376}
                    className="rounded-lg shadow-lg object-cover object-center absolute inset-0 w-full h-full lg:static lg:h-auto"
                  />
                </div>
              </figure>
            </div>
          </div>
          <div>
            {props._body && (
              <div className="prose"
                  data-tina-field={tinaField(props,'_body')}
              >
              <Markdown
                content={props._body}
              />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Ebook = (props: AuthorDataType["ebook"]) => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-steel-dark rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          {/* <div className="bg-gradient-to-r from-orange-800 to-yellow-500 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4"> */}
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 data-tina-field={tinaField(props,'title')} className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
                <span className="block">{props.title}</span>
              </h2>
              <Markdown
                classNames={{ p: "mt-4 text-lg leading-6 text-steel-xlight" }}
                content={props.description}
              />
              <a
              data-tina-field={tinaField(props,'link')}
                href={props.link || ""}
                className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base leading-6 font-medium text-steel-medium hover:text-steel-light hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                {props.link_text}
              </a>
            </div>
          </div>
          <div className="relative pb-3/5 -mt-6 md:pb-1/2">
            <img
              data-tina-field={tinaField(props,'image')}
              className="absolute inset-0 w-full h-full shadow-2xl transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              // src="https://res.cloudinary.com/deuzrsg3m/image/upload/v1604704629/jen-photos/jen-ebook_nghoag.png"
              src={props.image || ""}
              // src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
              alt="e-book screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
