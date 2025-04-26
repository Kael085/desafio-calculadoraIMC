export const Label = ({ children, htmlFor }) => {
    return (
      <Label htmlFor={htmlFor} className="label">
        {children}
      </Label>
    );
  };