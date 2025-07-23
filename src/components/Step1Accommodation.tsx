const Step1Accommodation = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          className="rounded-lg border border-gray-300 px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="house">House</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Photos</label>
        <input
          type="file"
          accept="image/*"
          multiple
          className="rounded-lg border border-gray-300 px-4 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </div>
  );
};

export default Step1Accommodation;
