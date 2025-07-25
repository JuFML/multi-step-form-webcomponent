import type { IFormData } from "../context/FormContext"

interface Step3OwnerProps {
  formData: IFormData;
  stepsTitles: string[]
}

const Step3Summary = ({ formData, stepsTitles }: Step3OwnerProps) => {
  const { name: accName, address, description, photosPreviews, type } = formData.accommodation
  const { name: ownerName, email, phone } = formData.owner

  return (
    <div className="space-y-5 min-h-[80vh]">

      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl">{stepsTitles[0]}</h1>
        <p><strong>Name: </strong>{accName}</p>
        <p><strong>Address: </strong>{address}</p>
        {description && <p><strong>Description: </strong>{description}</p>}
        <p><strong>Type: </strong>{type[0].toUpperCase() + type.slice(1)}</p>
        {photosPreviews.length > 0 && <><p><strong>Photos: </strong></p>
          <div className="flex gap-2">
            {photosPreviews.map(el => (<img
              key={el}
              src={el}
              alt={`Preview ${el}`}
              className="w-32 h-32 object-cover rounded border"
            />))}
          </div>
        </>}
      </div>
      <div className="flex flex-col space-y-4 mt-3.5">
        <h1 className="text-3xl">{stepsTitles[1]}</h1>
        <p><strong>Name: </strong>{ownerName}</p>
        <p><strong>Email: </strong>{email}</p>
        {phone && <p><strong>Phone: </strong>{phone}</p>}
      </div>
    </div>
  )
}

export default Step3Summary