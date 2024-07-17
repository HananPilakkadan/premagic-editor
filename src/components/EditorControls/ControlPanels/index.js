const ControlPanels = ({ editorControls, handleChange }) => {
  return (
    <div className="my-10 grid grid-cols-2 gap-4">
      {editorControls?.map((input) => (
        <div className="input w-full mb-4" key={input?.id}>
          <div className="flex items-center justify-between">
            <label
              htmlFor="brightness-range"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {input?.label}
            </label>
            <input
              type="text"
              className="w-[80px] border border-solid border-gray-300 rounded text-center"
              value={`${input?.value}%`}
            />
          </div>
          <input
            id="brightness-range"
            type="range"
            min="-100"
            max="100"
            value={input?.value}
            step={1}
            onChange={(e) => handleChange(input.id, e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      ))}
    </div>
  );
};

export default ControlPanels;
