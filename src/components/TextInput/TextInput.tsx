import { forwardRef, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

// Use React.forwardRef to handle the ref properly
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, type = "text", placeholder, value, onChange, ...rest }, ref) => {
    return (
      <div className="flex-column">
        <input
          type={type}
          className="text-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref} // Assign the forwarded ref
          {...rest}
        />
        {error && <p className="text-error text-left">{error}</p>}
      </div>
    );
  }
);

// Add a displayName for better debugging (optional)
TextInput.displayName = "TextInput";
