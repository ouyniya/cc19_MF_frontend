import React from "react";

function NotFound() {
  return (
    <>
      <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <button className="btn text-white bg-[var(--blue)] border-[var(--darkblue)] hover:bg-[var(--blue)] hover:border-[var(--darkblue)]">
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
