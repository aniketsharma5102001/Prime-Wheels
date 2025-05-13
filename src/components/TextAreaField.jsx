import React from 'react';
import { Textarea } from "@/components/ui/textarea";

function TextAreaField({ item, handleInputChange ,carInfo}) { // Destructure props
  return (
    <div>
      <Textarea
        onChange={(e) => handleInputChange(item.name, e.target.value)} // Correct usage
        required={item.required}
        defaultValue={carInfo?.[item.name]}

      />
    </div>
  );
}

export default TextAreaField;