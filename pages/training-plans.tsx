import React from "react";
import ReactDOM from "react-dom";
import * as yup from "yup";
import { Form2, Toggle, Text } from "../components/form";
import { Header2 } from "../components/header";
import { tenK, fiveK, halfMarathon, marathon } from "../data/paces";

import { sdk, AsyncReturnType } from "../.tina/sdk";
import { createLocalClient } from "../util/create-client";

const localSdk = sdk(createLocalClient());

export const getStaticProps = async (props) => {
  return {
    props: {
      data: await localSdk.getNav({
        variables: { relativePath: "site-nav.md" },
      }),
      ...localSdk.getNavString({ variables: { relativePath: "site-nav.md" } }),
      preview: !!props.preview,
    },
  };
};

export const Static = (props: {
  data: AsyncReturnType<typeof localSdk.getNav>;
}) => {
  const items = [fiveK, tenK, halfMarathon, marathon];

  const [planType, setPlanType] = React.useState<"premium" | "free">("premium");

  const selectedPlanStyles =
    "relative bg-white border-gray-200 rounded-md shadow-sm py-2 w-1/2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-steel-dark focus:z-10 sm:w-auto sm:px-8";
  const unselectedPlanStyles =
    "relative border border-transparent rounded-md py-2 w-1/2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-steel-dark focus:z-10 sm:w-auto sm:px-8";

  return (
    <>
      <div>
        <Header2 {...props.data.getNavDocument} />
        <div className="bg-gradient-to-b from-white to-gray-50 pb-24">
          <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                Training Plans
              </h1>
              <p className="mt-5 text-xl text-gray-500 sm:text-center">
                We offer training plans for 5k, 10k, half marathon & marathon as
                well as summer training programs. For our main events we offer 2
                types of plans, but no matter what you choose you'll be part of
                Golden Coast Track Club community. That means you'll have access
                to exclusive discounts on gear and you'll benefit from the
                community
              </p>
              <div className="relative mt-6 bg-gray-100 rounded-lg p-0.5 flex self-center sm:mt-8">
                <button
                  type="button"
                  onClick={() => setPlanType("premium")}
                  className={
                    planType === "premium"
                      ? selectedPlanStyles
                      : unselectedPlanStyles
                  }
                >
                  Premium Plans
                </button>
                <button
                  onClick={() => setPlanType("free")}
                  type="button"
                  className={
                    planType === "free"
                      ? selectedPlanStyles
                      : unselectedPlanStyles
                  }
                >
                  Free Plans
                </button>
              </div>
            </div>
            {planType === "free" ? (
              <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
                {items.map((item) => (
                  <FreeCard {...item} />
                ))}
              </div>
            ) : (
              <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
                {items.map((item) => (
                  <Card {...item} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FAQ offset */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Frequently asked questions
              </h2>
              <p className="text-lg text-gray-500">
                Can’t find the answer you’re looking for? Reach out to our{" "}
                <a
                  href="#"
                  className="font-medium text-steel-xdark hover:text-steel-dark"
                >
                  customer support
                </a>{" "}
                team.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    How do you make holy water?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    You boil the hell out of it. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quas cupiditate laboriosam
                    fugiat.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    What's the best thing about Switzerland?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    I don't know, but the flag is a big plus. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Quas cupiditate
                    laboriosam fugiat.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    What do you call someone with no body and no nose?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Nobody knows. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quas cupiditate laboriosam fugiat.
                  </dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Why do you never see elephants hiding in trees?
                  </dt>
                  <dd className="mt-2 text-base text-gray-500">
                    Because they're so good at it. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quas cupiditate laboriosam
                    fugiat.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Static;

const Portal = (
  props: {
    pace: {
      value: string;
      zone: string;
    };
    onClose: () => void;
  } & typeof fiveK
) => {
  return typeof document !== "undefined"
    ? ReactDOM.createPortal(<Modal {...props} />, document.body)
    : null;
};

import { ListBox } from "../components/form/list-box";
import { FormikHelpers } from "formik";

export const colonizeNumber = (item, unit = "time") => {
  // We are showing miles, not pace
  if (unit === "mileage") {
    return item;
  } else {
    return item
      .toString()
      .split(/(?=(?:\d{2})+(?:\.|$))/g)
      .join(":");
  }
};

const FreeCard = (props: typeof fiveK) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [activePace, setActivePace] = React.useState<
    typeof fiveK.free.paces[0]
  >(null);

  const activeRealPace = props.free?.paces?.find(
    (pace) => pace.value === activePace?.value
  );

  const activeRange = props.free?.ranges[activeRealPace?.zone];

  return (
    <div className="relative border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
      {active && (
        <Portal
          pace={activeRealPace}
          onClose={() => setActive(false)}
          {...props}
        />
      )}
      <div className={`p-6`}>
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          {props.display}
        </h2>
        <p className="mt-4 text-sm text-gray-500">
          All the basics for starting a new business
        </p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">Free</span>
          <span className="text-base font-medium text-gray-500">/ forever</span>
        </p>
        <ListBox
          onSelect={(value) => {
            setActivePace(value);
          }}
          activePace={activePace}
          // @ts-ignore
          zones={props.free.ranges}
          paces={props.free.paces?.reverse() || []}
        />
        <button
          // href="#"
          onClick={() => {
            if (activePace) {
              setActive(true);
            }
          }}
          disabled={activePace ? false : true}
          className={`mt-3 block w-full
              ${
                activePace ? "" : "bg-steel-xdark opacity-80 cursor-not-allowed"
              }
              bg-steel-xdark
              hover:bg-steel-dark
              border
              border-transparent
              rounded-md py-2
              text-sm
              font-semibold
              text-white
              text-center
              `}
        >
          Free
        </button>
      </div>
      <div className="pt-6 pb-8 px-6 relative">
        {!activeRange && (
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-white opacity-70" />
          </div>
        )}
        <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
          Each week includes
        </h3>
        <ul className="mt-6 space-y-4">
          {activeRange
            ? activeRange.features.map((feature) => (
                <Feature feature={feature} />
              ))
            : props.pro.ranges.low.features.map((feature) => (
                <Feature feature={feature} />
              ))}
        </ul>
      </div>
    </div>
  );
};

const Card = (props: typeof fiveK) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [activePace, setActivePace] = React.useState<typeof fiveK.pro.paces[0]>(
    null
  );

  const activeRealPace = props.pro?.paces?.find(
    (pace) => pace.value === activePace?.value
  );

  const activeRange = props.pro?.ranges[activeRealPace?.zone];

  return (
    <div className="relative border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
      {props.id === "10k" && (
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-white opacity-70" />
          <div className="-right-3 -top-4 absolute bg-mustard-light font-black px-2 py-2 rounded-sm shadow-lg text-sm text-white tracking-widest uppercase">
            Coming Soon
          </div>
        </div>
      )}
      {active && (
        <Portal
          pace={activeRealPace}
          onClose={() => setActive(false)}
          {...props}
        />
      )}
      <div className={`p-6`}>
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          {props.display}
        </h2>
        <p className="mt-4 text-sm text-gray-500">
          All the basics for starting a new business
        </p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">
            ${props.pro.ranges.advanced.price.toFixed(2)}
          </span>
          <span className="text-base font-medium text-gray-500">/ forever</span>
        </p>
        <ListBox
          onSelect={(value) => {
            setActivePace(value);
          }}
          activePace={activePace}
          zones={props.pro.ranges}
          paces={props.pro.paces?.reverse() || []}
        />
        <button
          // href="#"
          onClick={() => {
            if (activePace) {
              setActive(true);
            }
          }}
          disabled={activePace ? false : true}
          className={`mt-3 block w-full
              ${
                activePace ? "" : "bg-steel-xdark opacity-80 cursor-not-allowed"
              }
              bg-steel-xdark
              hover:bg-steel-dark
              border
              border-transparent
              rounded-md py-2
              text-sm
              font-semibold
              text-white
              text-center
              `}
        >
          Buy {props.display}
        </button>
      </div>
      <div className="pt-6 pb-8 px-6 relative">
        {!activeRange && (
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-white opacity-70" />
          </div>
        )}
        <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
          Each week includes
        </h3>
        <ul className="mt-6 space-y-4">
          {activeRange
            ? activeRange.features.map((feature) => (
                <Feature feature={feature} />
              ))
            : props.pro.ranges.low.features.map((feature) => (
                <Feature feature={feature} />
              ))}
        </ul>
      </div>
    </div>
  );
};

const Feature = (props: { feature: string }) => {
  return (
    <li className="flex space-x-3">
      {/* Heroicon name: solid/check */}
      <svg
        className="flex-shrink-0 h-5 w-5 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm text-gray-500">{props.feature}</span>
    </li>
  );
};

const Modal = (
  props: {
    pace: {
      value: string;
      zone: string;
    };
    onClose: () => void;
  } & typeof fiveK
) => {
  const activeRange = props.pro?.ranges[props.pace.zone];
  const [serverError, setServerError] = React.useState<string>(null);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/*
Background overlay, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0"
  To: "opacity-100"
Leaving: "ease-in duration-200"
  From: "opacity-100"
  To: "opacity-0"
    */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          ​
        </span>
        {/*
Modal panel, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
  From: "opacity-100 translate-y-0 sm:scale-100"
  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    */}
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="relative overflow-hidden">
            <div className="bg-steel-xdark px-4 py-6 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                  {props.display}
                </h2>
                <h4 className="text-mg font-bold leading-7 text-gray-200">
                  {colonizeNumber(props.pace.value)}
                </h4>
                <h4 className="text-mg font-bold leading-7 text-gray-200">
                  {activeRange.mileage.join(" to ")} miles per week
                </h4>
              </div>
            </div>
            <div className="p-5 text-left relative">
              {serverError && (
                <div
                  onClick={() => setServerError(null)}
                  className="absolute bottom-24 z-30 right-4 left-4 p-4 rounded-md shadow-lg bg-red-100 fond-bold"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {/* Heroicon name: solid/information-circle */}
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-red-700">{serverError}</p>
                      <p className="mt-3 text-sm md:mt-0 md:ml-6">
                        <button
                          onClick={() => setServerError(null)}
                          className="whitespace-nowrap font-medium text-red-700 hover:text-red-600"
                        >
                          Dismiss
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <Form2
                onSubmit={(values, actions) =>
                  onSubmit(values, actions, setServerError)
                }
                formClassName="space-y-8"
                schema={yup.object({
                  consent: yup
                    .bool()
                    .required()
                    .oneOf([true]),
                  email: yup
                    .string()
                    .required()
                    .email(),
                  event: yup.string().required(),
                  free: yup.string().required(),
                  pace: yup.string().required(),
                  subscribe: yup.bool(),
                  volume: yup.string().required(),
                })}
                initialValues={{
                  consent: false,
                  email: "",
                  event: props.id,
                  free: ["Low", "Medium", "High"].includes(props.pace.value)
                    ? "free"
                    : "pro",
                  // pace: "20000",
                  pace: props.pace.value,
                  volume: props.pace.zone,
                  subscribe: false,
                }}
                secondaryButton={
                  <button
                    type="button"
                    onClick={props.onClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                }
              >
                <Text
                  label="Email"
                  name="email"
                  placeholder=""
                  key=""
                  subLabel="We won't share your data"
                />
                <Toggle
                  label={"Subscribe me to news and updates from the program"}
                  name="subscribe"
                  subLabel="We won't share you data or send you unsolicited information"
                />
                <Toggle
                  label={"I agree to the terms & conditions"}
                  name="consent"
                  subLabel="Open link in new window"
                />
              </Form2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const onSubmit = async (
  values: object,
  actions: FormikHelpers<object>,
  setServerError: (message: string) => void
) => {
  try {
    // var stripe = Stripe(config.stripePublicKey);
    var stripe = Stripe("pk_test_EsayUWGIOM0f3PzoYcNM7J2V00f3RTpkpG");

    const response = await fetch(
      `https://api.staging.goldencoasttrackclub.com/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const res = await response.json();

    if (values.free === "pro") {
      await stripe
        .redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: res.id,
        })
        .then(function(result) {
          console.log("oh no", result);
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
    } else {
      window.location.assign("/");
    }
  } catch (e) {
    actions.setSubmitting(false);
    // setServerError(e.message);
    setServerError(
      "Something went wrong, please contact us at info@goldencoasttrackclub.com"
    );
    console.error(e);
  }
};
