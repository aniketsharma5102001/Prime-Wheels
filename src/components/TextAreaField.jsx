import React from 'react';
import { Textarea } from "@/components/ui/textarea";

function TextAreaField({ item, handleInputChange }) { // Destructure props
  return (
    <div>
      <Textarea
        onChange={(e) => handleInputChange(item.name, e.target.value)} // Correct usage
        required={item.required}
      />
    </div>
  );
}

export default TextAreaField;