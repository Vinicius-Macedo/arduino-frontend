type OrderButtonProps = {
  onClick: () => void;
  selectedButton: string;
  buttonText: string;
};

export function OrderButton(props: OrderButtonProps) {
  if (props.selectedButton === props.buttonText) {
  }

  return (
    <button
      onClick={props.onClick}
      className={
        "select-order-btn" + (props.selectedButton === props.buttonText.toLowerCase() ? " active" : "")
      }
    >
      {props.buttonText}
    </button>
  );
}
