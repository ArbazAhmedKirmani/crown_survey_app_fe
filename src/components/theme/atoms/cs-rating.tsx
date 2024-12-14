import { useState, useEffect } from "react";

interface ICSRating {
  list: any[];
  value?: number; // To support controlled value from Form.Item
  onChange?: (val: { target: { value: number } }) => void; // For Form.Item compatibility
}

const CSRating = (props: ICSRating) => {
  const [rating, setRating] = useState<number>(props.value || 0);

  useEffect(() => {
    if (props.value !== undefined) {
      setRating(props.value); // Update internal state if `value` prop changes
    }
  }, [props.value]);

  const handleClick = (index: number) => {
    setRating(index); // Update local state
    props.onChange?.({ target: { value: index } }); // Notify Form.Item
  };

  return (
    <div className="cs-rating">
      {props?.list?.map((item, index) => (
        <div
          key={index}
          className={`rating-item ${rating === index ? "active" : ""}`}
          onClick={() => handleClick(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default CSRating;
