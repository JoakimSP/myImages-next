

export default function InputField({ label, type, name, textColor, ...rest }) {
    return (
        <div className="my-4">
            <label htmlFor={name} className={`block mb-2 text-${textColor} font-medium`}>{label} *</label>
            <input type={type} name={name} id={name} {...rest} className="border rounded-md p-2 w-full focus:ring focus:ring-custom-grey-light focus:border-transparent" required/>
        </div>

    )
}
