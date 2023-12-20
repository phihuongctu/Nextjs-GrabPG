import { useEffect } from "react";

export default function ModalConfirm({ modal, setModal, data }) {
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = " unset";
    }
  }, [modal]);
  // const closeModal = setModal(!modal);
  return (
    <div
      className={` ${
        modal ? "" : "hidden"
      } min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover `}
      id="modal-id"
    >
      <div
        className="absolute bg-black opacity-80 inset-0 z-0"
        onClick={() => setModal(!modal)}
      />
      <div className=" w-100-32 max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        {/*content*/}
        <div className>
          {/*body*/}
          <div className="text-center p-5 flex-auto justify-center">
            <div className="thumbnail inline-block">
              <svg
                width={91}
                height={91}
                viewBox="0 0 91 91"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g style={{ mixBlendMode: "luminosity" }} opacity="0.8">
                  <circle
                    cx="45.5"
                    cy="45.5"
                    r={45}
                    fill="black"
                    fillOpacity="0.04"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M55.1 22.9821V25.9451H67.7C68.6941 25.9451 69.5 26.741 69.5 27.7229C69.5 28.7047 68.6941 29.5007 67.7 29.5007H23.3C22.3059 29.5007 21.5 28.7047 21.5 27.7229C21.5 26.741 22.3059 25.9451 23.3 25.9451H35.9V22.9821C35.9 20.6912 37.7804 18.834 40.1 18.834H50.9C53.2196 18.834 55.1 20.6912 55.1 22.9821ZM39.5 22.9821C39.5 22.6549 39.7686 22.3895 40.1 22.3895H50.9C51.2314 22.3895 51.5 22.6549 51.5 22.9821V25.9451H39.5V22.9821Z"
                    fill="#1D53DA"
                  />
                  <path
                    d="M28.6918 33.4775C28.596 32.5003 27.7162 31.7847 26.7267 31.8793C25.7373 31.9738 25.0127 32.8428 25.1085 33.82L28.4986 68.4187C28.707 70.545 30.5162 72.1673 32.6791 72.1673H58.3212C60.4841 72.1673 62.2933 70.545 62.5016 68.4187L65.8918 33.82C65.9875 32.8428 65.263 31.9738 64.2735 31.8793C63.284 31.7847 62.4043 32.5003 62.3085 33.4775L58.9184 68.0763C58.8886 68.38 58.6302 68.6118 58.3212 68.6118H32.6791C32.3701 68.6118 32.1116 68.38 32.0819 68.0763L28.6918 33.4775Z"
                    fill="#1D53DA"
                  />
                  <path
                    d="M38.7944 36.6148C39.7868 36.5572 40.6386 37.305 40.6969 38.2851L41.8969 58.4333C41.9553 59.4134 41.1982 60.2547 40.2058 60.3124C39.2134 60.3701 38.3615 59.6222 38.3032 58.6421L37.1032 38.4939C37.0448 37.5138 37.802 36.6725 38.7944 36.6148Z"
                    fill="#1D53DA"
                  />
                  <path
                    d="M53.8969 38.4939C53.9553 37.5138 53.1982 36.6725 52.2058 36.6148C51.2134 36.5572 50.3615 37.305 50.3032 38.2851L49.1032 58.4333C49.0448 59.4134 49.802 60.2547 50.7944 60.3124C51.7868 60.3701 52.6386 59.6222 52.697 58.6421L53.8969 38.4939Z"
                    fill="#1D53DA"
                  />
                </g>
              </svg>
            </div>

            <h2 className="text-xl font-bold py-4 text-gray-500 ">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-500 px-8">
              Do you really want to delete your account? This process cannot be
              undone
            </p>
          </div>
          {/*footer*/}
          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => setModal(!modal)}
              className="mb-2 md:mb-0  px-10 py-4 text-sm shadow-sm font-medium tracking-wider text-blue-600 bg-blue-100 rounded-lg "
            >
              Cancel
            </button>
            <button
              onClick={() => setModal(!modal)}
              className="mb-2 md:mb-0 bg-blue-600  px-10 py-4 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
