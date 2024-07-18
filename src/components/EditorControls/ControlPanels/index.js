const ControlPanels = ({ editorControls, handleChange, newImageData }) => {
  return (
    <>
      <div className="my-10 grid grid-cols-2 gap-4">
        {editorControls?.map((input) => (
          <div className="input w-full mb-4" key={input?.id}>
            <div className="flex items-center justify-between">
              <label
                htmlFor={`${input.id}-range`}
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                {input?.label}
              </label>
              <input
                disabled={!newImageData || newImageData.length === 0}
                type="text"
                className={`w-[80px] border border-solid border-gray-300 rounded text-center ${
                  !newImageData || newImageData.length === 0
                } ? "opacity-50" : ""}`}
                value={`${input?.value}`}
                onChange={(e) =>
                  handleChange(input.id, e.target.value, input.value)
                }
              />
            </div>
            <input
              disabled={!newImageData || newImageData.length === 0}
              id={`${input.id}-range`}
              type="range"
              min="0"
              max="200"
              value={input?.value}
              step={1}
              onChange={(e) =>
                handleChange(input.id, e.target.value, input.value)
              }
              className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 
                ${
                  !newImageData || newImageData.length === 0
                } ? "opacity-50" : ""}
            `}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ControlPanels;
