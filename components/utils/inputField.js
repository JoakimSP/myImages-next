export default function InputField({ label, type, name, textColor, as, ...rest }) {
    const InputOrTextarea = as === "textarea" ? "textarea" : "input";
    
    return (
      <div className="my-4">
        <label htmlFor={name} className={`block mb-2 text-${textColor} font-medium`}>{label} *</label>
        {InputOrTextarea === "textarea" ? (
          <textarea name={name} id={name} {...rest} className="border rounded-md p-2 w-full focus:ring focus:ring-custom-grey-light focus:border-transparent" required></textarea>
        ) : (
          <input type={type} name={name} id={name} {...rest} className="border rounded-md p-2 w-full focus:ring focus:ring-custom-grey-light focus:border-transparent" required/>
        )}
      </div>
    );
  }
  