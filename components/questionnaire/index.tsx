import React from "react";

export const Questionnaire = () => {
  return (
    <div id="questionnaire" className="relative bg-white">
      <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl mx-auto">
        <div className="">
          <div className="max-w-md mx-auto sm:max-w-lg">
            <h2 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10">
              Let's work together
            </h2>
            <p className="mt-4 text-lg leading-7 text-gray-500 sm:mt-3">
              We’d love to hear from you! Send us a message using the form
              opposite, or email us. We’d love to hear from you! Send us a
              message using the form opposite, or email us.
            </p>
            <form
              action="#"
              method="POST"
              className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            >
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="first_name"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="last_name"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    type="email"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Company
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="company"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Phone
                  </label>
                  <span className="text-sm leading-5 text-gray-500">
                    Optional
                  </span>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="phone"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="how_can_we_help"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    How can we help you?
                  </label>
                  <span className="text-sm leading-5 text-gray-500">
                    Max. 500 characters
                  </span>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <textarea
                    id="how_can_we_help"
                    rows={4}
                    className="form-textarea block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    defaultValue={""}
                  />
                </div>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="block text-sm font-medium leading-5 text-gray-700">
                  Expected budget
                </legend>
                <div className="mt-4 grid grid-cols-1 gap-y-4">
                  <div className="flex items-center">
                    <input
                      id="budget_under_25k"
                      name="budget"
                      defaultValue="under_25k"
                      type="radio"
                      className="form-radio h-4 w-4 text-steel-medium transition duration-150 ease-in-out"
                    />
                    <label htmlFor="budget_under_25k" className="ml-3">
                      <span className="block text-sm leading-5 text-gray-700">
                        Less than $25K
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="budget_25k-50k"
                      name="budget"
                      defaultValue="25k-50k"
                      type="radio"
                      className="form-radio h-4 w-4 text-steel-medium transition duration-150 ease-in-out"
                    />
                    <label htmlFor="budget_25k-50k" className="ml-3">
                      <span className="block text-sm leading-5 text-gray-700">
                        $25K – $50K
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="budget_50k-100k"
                      name="budget"
                      defaultValue="50k-100k"
                      type="radio"
                      className="form-radio h-4 w-4 text-steel-medium transition duration-150 ease-in-out"
                    />
                    <label htmlFor="budget_50k-100k" className="ml-3">
                      <span className="block text-sm leading-5 text-gray-700">
                        $50K – $100K
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="budget_over_100k"
                      name="budget"
                      defaultValue="over_100k"
                      type="radio"
                      className="form-radio h-4 w-4 text-steel-medium transition duration-150 ease-in-out"
                    />
                    <label htmlFor="budget_over_100k" className="ml-3">
                      <span className="block text-sm leading-5 text-gray-700">
                        $100K+
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label
                  htmlFor="how_did_you_hear_about_us"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  How did you hear about us?
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="how_did_you_hear_about_us"
                    className="form-input block w-full transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="text-right sm:col-span-2">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-steel-medium hover:bg-steel-light focus:outline-none focus:border-steel-dark focus:shadow-outline-indigo active:bg-steel-dark transition duration-150 ease-in-out"
                  >
                    Submit
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
