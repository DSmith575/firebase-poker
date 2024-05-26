export const formStyles = {
  formBase:
    'relative bg-white px-6 pt-10 flex flex-col sm:w-[500px] items-center border pb-8 shadow-xl ring-1 ring-gray-900/5 mx-4 my-2 sm:rounded-lg',
  formHeader: 'text-6xl p-4',
  authCardIcon: 'text-[150px] absolute top-0 right-0 rotate-[30deg]',
};

export const authSectionStyles = {
  authBase: 'relative block flex flex-col overflow-hidden',
  authButton:
    'p-4 w-[185px] flex justify-center border rounded-lg bg-slate-500 text-white hover:bg-sky-600 transition ease-in-and-out duration-700',
  authButtonSpinner: 'animate-spin h-6 w-6',
};

export const createGameForm = {
  input: 'border-2 border-gray-300 p-2 rounded-md',
  isActive: 'bg-blue-500 text-white',
  isInactive: 'bg-red-500 text-gray-800',
  button: 'px-4 py-2 rounded-md focus:outline-none',
};
